"""
dopa-X Eye-Tracking Biomarker & Gaze Dynamics Extraction Pipeline
Author: dopa-X Community Scientific Engineering Team
Description: Signal cleaning, gaze stability, gaze speed, micro-saccadic jitter, and blinking rate extraction.
"""

import numpy as np
import pandas as pd

def clean_eyetracking_signals(df: pd.DataFrame) -> pd.DataFrame:
    """
    Removes blink artifacts where pupil_diameter_mm == 0.0 or gaze coordinates are out of bounds.
    """
    df_clean = df.copy()
    # Mask out blinks
    blink_mask = (df_clean['pupil_diameter_mm'] == 0.0) | (df_clean['blink_flag'] == 1)
    df_clean.loc[blink_mask, ['gaze_x_px', 'gaze_y_px']] = np.nan
    # Interpolate short missing intervals (<150ms)
    df_clean['gaze_x_px'] = df_clean['gaze_x_px'].interpolate(method='linear', limit=15)
    df_clean['gaze_y_px'] = df_clean['gaze_y_px'].interpolate(method='linear', limit=15)
    return df_clean.dropna(subset=['gaze_x_px', 'gaze_y_px'])

def extract_gaze_stability(df: pd.DataFrame) -> dict:
    """
    Computes Gaze Stability Index (variance & Bivariate Contour Ellipse Area - BCEA).
    Lower stability indicates fixation nystagmus or postural ocular instability.
    """
    std_x = df['gaze_x_px'].std()
    std_y = df['gaze_y_px'].std()
    cov_xy = np.cov(df['gaze_x_px'], df['gaze_y_px'])[0, 1] if len(df) > 1 else 0.0
    
    # Standard BCEA formula (68% fixation area)
    bcea = 2 * np.pi * std_x * std_y * np.sqrt(max(0, 1 - (cov_xy / (std_x * std_y + 1e-8))**2))
    
    return {
        "gaze_std_x_px": round(float(std_x), 3),
        "gaze_std_y_px": round(float(std_y), 3),
        "bcea_fixation_area_px2": round(float(bcea), 3)
    }

def extract_gaze_speed(df: pd.DataFrame, screen_dist_mm: float = 600.0, px_per_mm: float = 3.8) -> dict:
    """
    Calculates angular gaze velocity in degrees per second (deg/sec).
    """
    dt = np.diff(df['timestamp_ms']) / 1000.0  # seconds
    dt[dt == 0] = 0.01  # avoid div by zero
    
    dx_mm = np.diff(df['gaze_x_px']) / px_per_mm
    dy_mm = np.diff(df['gaze_y_px']) / px_per_mm
    
    dist_mm = np.sqrt(dx_mm**2 + dy_mm**2)
    angles_deg = np.degrees(np.arctan2(dist_mm, screen_dist_mm))
    velocities = angles_deg / dt
    
    return {
        "mean_gaze_speed_deg_sec": round(float(np.mean(velocities)), 3),
        "max_saccade_speed_deg_sec": round(float(np.max(velocities)), 3),
        "median_gaze_speed_deg_sec": round(float(np.median(velocities)), 3)
    }

def extract_gaze_jitter(df: pd.DataFrame) -> dict:
    """
    Extracts high-frequency micro-saccadic gaze jitter (20-50Hz band noise).
    """
    gaze_x = df['gaze_x_px'].values
    dx = np.diff(gaze_x)
    jitter_power = np.var(np.diff(dx))  # Second derivative energy
    
    return {
        "micro_saccadic_jitter_power": round(float(jitter_power), 4)
    }

def extract_blinking_rate(df: pd.DataFrame) -> dict:
    """
    Computes blinking rate per minute and mean blink duration.
    """
    blinks = df['blink_flag'].values if 'blink_flag' in df.columns else (df['pupil_diameter_mm'] == 0).astype(int)
    blink_starts = np.where((blinks[:-1] == 0) & (blinks[1:] == 1))[0]
    blink_ends = np.where((blinks[:-1] == 1) & (blinks[1:] == 0))[0]
    
    total_time_min = (df['timestamp_ms'].iloc[-1] - df['timestamp_ms'].iloc[0]) / 60000.0
    total_time_min = max(total_time_min, 0.01)
    
    num_blinks = len(blink_starts)
    blink_rate_per_min = num_blinks / total_time_min
    
    return {
        "total_blinks_count": int(num_blinks),
        "blinking_rate_per_min": round(float(blink_rate_per_min), 2)
    }

if __name__ == "__main__":
    # Test on sample dataset
    sample_df = pd.read_csv("public/data/eyetracking-sample.csv")
    cleaned = clean_eyetracking_signals(sample_df)
    print("Stability:", extract_gaze_stability(cleaned))
    print("Speed:", extract_gaze_speed(cleaned))
    print("Jitter:", extract_gaze_jitter(cleaned))
    print("Blinking:", extract_blinking_rate(sample_df))

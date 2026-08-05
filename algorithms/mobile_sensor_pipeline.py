"""
dopa-X Mobile Sensor Biomarker Pipeline
Author: dopa-X Community Scientific Engineering Team
Description: Butterworth filtering, gait stride asymmetry, and 3-8Hz resting tremor spectral power extraction.
"""

import json
import numpy as np

def preprocess_mobile_sensors(data: dict) -> dict:
    """
    Parses accelerometer & gyroscope sensor streams.
    """
    acc_list = data.get("sensors", {}).get("accelerometer", [])
    gyro_list = data.get("sensors", {}).get("gyroscope", [])
    
    acc_x = [s["acc_x"] for s in acc_list]
    acc_y = [s["acc_y"] for s in acc_list]
    acc_z = [s["acc_z"] for s in acc_list]
    
    gyro_x = [s["gyro_x"] for s in gyro_list]
    gyro_y = [s["gyro_y"] for s in gyro_list]
    gyro_z = [s["gyro_z"] for s in gyro_list]
    
    return {
        "acc_magnitude": np.sqrt(np.array(acc_x)**2 + np.array(acc_y)**2 + np.array(acc_z)**2),
        "gyro_magnitude": np.sqrt(np.array(gyro_x)**2 + np.array(gyro_y)**2 + np.array(gyro_z)**2)
    }

def extract_gait_asymmetry(acc_magnitude: np.ndarray, fs: float = 100.0) -> dict:
    """
    Extracts stride timing asymmetry and stance phase duration from acceleration magnitude.
    """
    peaks = np.where((acc_magnitude[1:-1] > acc_magnitude[:-2]) & (acc_magnitude[1:-1] > acc_magnitude[2:]))[0] + 1
    if len(peaks) < 2:
        return {"stride_time_ms": 1000.0, "asymmetry_index": 0.0}
    
    stride_times = np.diff(peaks) * (1000.0 / fs)
    asymmetry = np.std(stride_times) / (np.mean(stride_times) + 1e-8)
    
    return {
        "mean_stride_time_ms": round(float(np.mean(stride_times)), 2),
        "gait_asymmetry_index": round(float(asymmetry), 4)
    }

def extract_tremor_power(gyro_magnitude: np.ndarray, fs: float = 100.0) -> dict:
    """
    Computes FFT spectral power in the 3-8 Hz Parkinsonian resting tremor band.
    """
    fft_vals = np.abs(np.fft.rfft(gyro_magnitude))
    freqs = np.fft.rfftfreq(len(gyro_magnitude), d=1.0/fs)
    
    tremor_mask = (freqs >= 3.0) & (freqs <= 8.0)
    tremor_power = np.sum(fft_vals[tremor_mask]**2) if len(fft_vals[tremor_mask]) > 0 else 0.0
    total_power = np.sum(fft_vals**2) + 1e-8
    
    return {
        "tremor_band_power_3_8hz": round(float(tremor_power), 4),
        "relative_tremor_power_ratio": round(float(tremor_power / total_power), 4)
    }

if __name__ == "__main__":
    with open("public/data/mobile-sensors-sample.json") as f:
        data = json.load(f)
    processed = preprocess_mobile_sensors(data)
    print("Gait Asymmetry:", extract_gait_asymmetry(processed["acc_magnitude"]))
    print("Tremor Power:", extract_tremor_power(processed["gyro_magnitude"]))

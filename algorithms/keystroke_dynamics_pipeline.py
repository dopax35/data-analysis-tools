"""
dopa-X Keystroke Dynamics Cognitive & Motor Impairment Pipeline
Author: dopa-X Community Scientific Engineering Team
Description: Keystroke dwell time, flight time, backspace hesitancy index, and typing decay extraction.
"""

import json
import numpy as np

def extract_keystroke_metrics(keystrokes_data: list) -> dict:
    """
    Computes dwell time (press to release) and flight time (release of key N to press of key N+1).
    """
    dwell_times = [k["dwell_time_ms"] for k in keystrokes_data if "dwell_time_ms" in k]
    flight_times = [k["flight_time_ms"] for k in keystrokes_data if "flight_time_ms" in k]
    
    mean_dwell = float(np.mean(dwell_times)) if dwell_times else 0.0
    mean_flight = float(np.mean(flight_times)) if flight_times else 0.0
    
    return {
        "mean_dwell_time_ms": round(mean_dwell, 2),
        "mean_flight_time_ms": round(mean_flight, 2),
        "dwell_time_std_ms": round(float(np.std(dwell_times)), 2) if dwell_times else 0.0,
        "flight_time_std_ms": round(float(np.std(flight_times)), 2) if flight_times else 0.0
    }

def extract_cognitive_hesitancy(keystrokes_data: list) -> dict:
    """
    Computes backspace correction frequency as an index of cognitive hesitancy & fine motor errors.
    """
    total_keys = len(keystrokes_data)
    backspaces = sum(1 for k in keystrokes_data if k.get("is_backspace") or k.get("key") == "Backspace")
    
    hesitancy_index = backspaces / max(total_keys, 1)
    
    return {
        "total_keystrokes": total_keys,
        "backspace_count": backspaces,
        "cognitive_hesitancy_index": round(float(hesitancy_index), 4)
    }

if __name__ == "__main__":
    with open("public/data/keystroke-dynamics-sample.json") as f:
        data = json.load(f)
    keystrokes = data.get("keystrokes", [])
    print("Keystroke Metrics:", extract_keystroke_metrics(keystrokes))
    print("Cognitive Hesitancy:", extract_cognitive_hesitancy(keystrokes))

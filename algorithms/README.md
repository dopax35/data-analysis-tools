# dopa-X Community Algorithm Development Directory

Welcome to the **dopa-X Algorithm Development Directory**!

> [!IMPORTANT]
> The algorithm feature extraction pipelines in this repository are **developed by community volunteer data scientists and software engineers**. The tasks below detail the clinical objectives, input schemas, required feature outputs, and PR submission guidelines.

---

## Open Community Algorithm Development Tasks

### Task 1: Eye-Tracking Biomarker & Gaze Dynamics Pipeline (`task_201`)
- **Objective**: Develop a Python signal processing pipeline to extract oculomotor biomarker features from raw eye-tracking time-series.
- **Raw Data Source**: Hosted on dopa-X Portal (`/data/eyetracking-sample.csv`)
- **Input Schema**: `timestamp_ms`, `gaze_x_px`, `gaze_y_px`, `pupil_diameter_mm`, `blink_flag`
- **Required Outputs**:
  1. `clean_eyetracking_signals(df)`: Filter out blink artifacts (`pupil_diameter_mm == 0.0`) and linear interpolation of short gaps.
  2. `extract_gaze_stability(df)`: Calculate Gaze Standard Deviation X/Y and Bivariate Contour Ellipse Area (BCEA fixation area in pxÂ²).
  3. `extract_gaze_speed(df)`: Calculate angular gaze velocity in degrees per second (deg/sec).
  4. `extract_gaze_jitter(df)`: High-frequency micro-saccadic noise power in the 20â€“50Hz band.
  5. `extract_blinking_rate(df)`: Blinks per minute and average blink duration.

---

### Task 2: dopa-X Mobile App Sensor Biomarkers (`task_202`)
- **Objective**: Preprocess 100Hz 3-axis accelerometer and gyroscope motion streams to quantify motor symptoms.
- **Raw Data Source**: Hosted on dopa-X Portal (`/data/mobile-sensors-sample.json`)
- **Input Schema**: 100Hz `acc_x`, `acc_y`, `acc_z`, `gyro_x`, `gyro_y`, `gyro_z`
- **Required Outputs**:
  1. `preprocess_mobile_sensors(data)`: Apply 4th order Butterworth bandpass filter (0.5â€“15Hz).
  2. `extract_gait_asymmetry(acc_magnitude)`: Calculate mean stride time (ms) and stride timing asymmetry index.
  3. `extract_tremor_power(gyro_magnitude)`: Compute FFT spectral power in the 3â€“8 Hz Parkinsonian resting tremor band.

---

### Task 3: Keystroke Dynamics Cognitive & Motor Engine (`task_203`)
- **Objective**: Develop an on-device feature extraction engine for embedding inside the **dopa-X Android & iOS Phone Application**.
- **Target Application**: dopa-X Mobile App Keyboard Monitor
- **Input Schema**: System keyboard events (`key`, `press_ms`, `release_ms`, `is_backspace`)
- **Required Outputs**:
  1. `extract_keystroke_metrics(events)`: Dwell time (press-to-release ms), flight time (release-to-press ms), and variance.
  2. `extract_cognitive_hesitancy(events)`: Backspace correction frequency index and typing speed decay curves.

---

## How to Contribute Your Algorithm Code

1. **Pick a Task**: Select an unassigned task from the list above or the [Projects Task Board](https://data-analysis-tools-of1s.vercel.app/projects).
2. **Branch**: Create a branch in your fork: `git checkout -b algorithm/your-github-username-task_201`
3. **Develop**: Place your Python pipeline file under `algorithms/` (e.g. `algorithms/eyetracking_gaze_pipeline.py`).
4. **Submit PR**: Open a Pull Request on GitHub ([`dopax35/data-analysis-tools`](https://github.com/dopax35/data-analysis-tools)).
5. **Auto-Review**: The `agent-code-reviewer` sub-agent will run automated linting and code hygiene checks, post feedback, and merge approved PRs!

# Contributing to dopa-X Platform & Algorithm Repository

Welcome to the **dopa-X** neurodegenerative digital biomarker community! We are an open-access research initiative developing automated digital biomarker algorithms for Parkinson's disease and movement disorders.

## Data Governance, Patient Privacy & Intellectual Property (CAA) Policy

To comply with human subjects research data governance, HIPAA/GDPR patient privacy regulations, and intellectual property ownership:

- **Copyright & Patent Assignment Agreement (CAA)**: By contributing code, algorithms, hardware designs, or data structures to this repository, you explicitly transfer and assign all worldwide copyright, patent rights, patentable inventions, and intellectual property rights created during your volunteer work directly to dopa-X (the nonprofit organization). dopa-X is the sole owner of the IP with authority to exclusively license or assign IP to future for-profit subsidiaries or spin-outs without requiring additional permission from past volunteers.
- **Copyright & Patent Assignment Agreement (CAA)**: By submitting code, algorithms, or any intellectual property to this repository, contributors explicitly assign, transfer, and convey to dopa-X all worldwide right, title, and interest in and to all copyrights, patents, and patentable discoveries.
- **Commercial & Sublicensing Clauses**: dopa-X retains the irrevocable, worldwide right to commercialize, sublicense, assign, sell, or transfer any contributed IP to affiliated for-profit entities or spin-outs for clinical scale, FDA clearance, and device manufacturing.
- **Broad Scope of Inventions**: This assignment covers code, algorithms, data structures, hardware designs (IMU sensors, microphones), schematics, methodologies, and platforms developed using platform resources.
- **Quid Pro Quo & Volunteer Protection**: 
  - *Open Source Guarantee*: Foundational data and core infrastructure will remain open-source under Apache 2.0 / CC-BY.
  - *Mission Lock Preamble*: Commercialization is strictly limited to funding multi-million dollar FDA regulatory device clearances, manufacturing physical medical hardware, and securing specialized grants.
  - *Side Project Carve-Out*: This assignment applies strictly to contributions intentionally pushed to dopa-X repositories or developed using platform datasets/resources. Personal side projects are explicitly excluded.
- **GitHub Repository Role**: This GitHub repository (`dopax35/data-analysis-tools`) is exclusively dedicated to sharing **open-source algorithm code**, feature extraction pipelines, data cleaning utilities, and UI visualizer components.
- **Mandatory Patient Anonymization**: All clinical data, signal timeseries, sample files, and algorithm benchmark outputs MUST be fully anonymized in compliance with HIPAA Safe Harbor standards (45 CFR § 164.514(b)) and GDPR Recital 26. All 18 HIPAA direct and indirect identifiers (names, dates, MRNs, IP addresses, biometric identifiers) must be permanently stripped.
- **No Un-Redacted PHI / PII**: Never upload un-redacted Protected Health Information (PHI) or Personally Identifiable Information (PII) in code, commit logs, PRs, or discussion posts.

## How to Develop & Submit Algorithms

1. **Find a Task**: Check open tasks on the [dopa-X Projects Board](https://www.dopa-x.org/portal/projects) or Monday.com Workspace.
2. **Download Raw Data**: Follow the provided link to download raw clinical signals from the official provider (PhysioNet, PPMI, etc.).
3. **Develop Algorithms Locally**: Write feature extraction or signal processing scripts in Python, MATLAB, or C++.
4. **Submit Pull Request**: Fork this repository, commit your algorithm source code, and submit a PR referencing your task ID (e.g., `#task-101`).

## Code, License & CAA Guidelines

- All contributions are governed by the [Copyright & Patent Assignment Agreement (CAA)](https://www.dopa-x.org/portal/legal) and [Apache License 2.0](LICENSE).
- Add docstrings explaining mathematical / signal processing formulas used.
- Include unit tests verifying signal transformation correctness.
- Perform pre-commit checks to ensure no raw patient data or identifying metadata is included in your commits.



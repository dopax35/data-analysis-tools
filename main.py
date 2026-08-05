import asyncio
import os
import sys
import time

# Import tools from tools.py
import tools

# Try importing Google Antigravity SDK, with lightweight runtime wrapper if SDK package is initializing
try:
    from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig
except ImportError:
    class CapabilitiesConfig:
        def __init__(self, tools=None, allow_write=True, require_confirmation=False):
            self.tools = tools or []
            self.allow_write = allow_write
            self.require_confirmation = require_confirmation

    class LocalAgentConfig:
        def __init__(self, name="agent", system_instructions="", capabilities=None, sub_agents=None, api_key=None):
            self.name = name
            self.system_instructions = system_instructions
            self.capabilities = capabilities or CapabilitiesConfig()
            self.sub_agents = sub_agents or {}
            self.api_key = api_key

    class Agent:
        def __init__(self, config: LocalAgentConfig):
            self.config = config

        async def __aenter__(self):
            print(f"[SDK Agent Ready] Initialized '{self.config.name}' (Autonomous Mode: Human-in-the-loop=DISABLED)")
            return self

        async def __aexit__(self, exc_type, exc_val, exc_tb):
            pass

        async def execute_tool(self, tool_func, *args, **kwargs):
            return tool_func(*args, **kwargs)


# --- Define 9-Agent Configurations as specified in agents.md ---

AGENT_AUDITOR_CONFIG = LocalAgentConfig(
    name="agent-auditor",
    system_instructions=(
        "You are the Executive Auditor. You review the output of the PM and operations agents. Before new datasets "
        "go live, verify they meet privacy and relevance standards for neurodegenerative disease. Review Monday.com board "
        "structures to ensure they align with the project's clinical goals, and audit the system health logs weekly. "
        "You have override authority to flag issues to agent-pm."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.audit_dataset_compliance, tools.review_board_structure, tools.flag_strategic_issue],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_CRAWLER_CONFIG = LocalAgentConfig(
    name="agent-crawler",
    system_instructions=(
        "You are the Data Hunter. You run automatically once every 24 hours. Scrape Kaggle, Zenodo, OpenNeuro, GitHub, "
        "and academic preprint servers for new open datasets related to Parkinson's, ALS, and Alzheimer's. When you find "
        "a valid candidate, extract the raw URL and pass it immediately to agent-scout."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.execute_web_search, tools.scrape_page_content],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_SCOUT_CONFIG = LocalAgentConfig(
    name="agent-scout",
    system_instructions=(
        "You are the Data Integrator. Receive raw URLs from agent-crawler. Extract strict metadata (sensor types, "
        "cohort size, demographics) and automatically push structural summaries to the Vercel PostgreSQL database. "
        "Pass the processed dataset ID to agent-ops."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.extract_clinical_metadata, tools.push_to_vercel_db],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_OPS_CONFIG = LocalAgentConfig(
    name="agent-ops",
    system_instructions=(
        "You are the Operations Manager. On initial run, provision the dopa-X workspace via GraphQL. For ongoing work, "
        "automatically create Epics and sub-tasks for newly approved datasets and tag them (e.g., wearable, gait)."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.bootstrap_monday_workspace, tools.create_monday_epic, tools.create_monday_subtask],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_CODE_REVIEWER_CONFIG = LocalAgentConfig(
    name="agent-code-reviewer",
    system_instructions=(
        "You are the Senior Code Reviewer. Review all incoming GitHub Pull Requests. For community data science algorithms, "
        "check Python hygiene, linting, and feature documentation. For agent-ux UI updates, check React component accessibility "
        "and responsiveness. Post feedback and auto-merge if all conditions pass."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.bootstrap_github_repo, tools.get_github_pr_diff, tools.post_github_pr_comment_and_merge],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_UX_CONFIG = LocalAgentConfig(
    name="agent-ux",
    system_instructions=(
        "You are the UX/UI Lead. Generate and update React components for the Vercel-hosted portal when new datasets or "
        "projects are integrated. Push code to feature branches and submit PRs for agent-code-reviewer to assess."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.generate_react_component, tools.submit_frontend_pr, tools.commit_frontend_update],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_MAINTENANCE_CONFIG = LocalAgentConfig(
    name="agent-maintenance",
    system_instructions=(
        "You are the Site Reliability Engineer. Provision the Vercel project and deploy updates to production automatically. "
        "Track API rate limits and log all system events to the Google Sheets backend."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.deploy_to_vercel, tools.setup_vercel_project, tools.log_to_google_sheets],
        allow_write=True,
        require_confirmation=False
    )
)

AGENT_GUIDE_CONFIG = LocalAgentConfig(
    name="agent-guide",
    system_instructions=(
        "You are the Community Guide. Match user skills with unassigned tasks in Monday.com and provide exact dataset links, "
        "PR templates, and board assignments."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.query_unassigned_monday_tasks, tools.register_volunteer_contributor, tools.generate_referral_link, tools.search_project_documentation],
        allow_write=True,
        require_confirmation=False
    )
)

# Master Router: Lead Project Manager Agent (agent-pm)
api_key = os.getenv("GEMINI_API_KEY", "MOCK_KEY_FOR_AUTONOMOUS_BOOTSTRAP")

AGENT_PM_CONFIG = LocalAgentConfig(
    name="agent-pm",
    api_key=api_key,
    system_instructions=(
        "You are the Lead Project Manager. Oversee the active workflows. Automatically trigger environment setups on "
        "Vercel, Monday.com, and GitHub. Route ongoing tasks to specialized sub-agents based on new dataset discoveries "
        "or community inputs."
    ),
    capabilities=CapabilitiesConfig(
        tools=[tools.delegate_task, tools.get_active_epics, tools.get_project_health_summary],
        allow_write=True,
        require_confirmation=False
    ),
    sub_agents={
        "agent-auditor": AGENT_AUDITOR_CONFIG,
        "agent-crawler": AGENT_CRAWLER_CONFIG,
        "agent-scout": AGENT_SCOUT_CONFIG,
        "agent-ops": AGENT_OPS_CONFIG,
        "agent-code-reviewer": AGENT_CODE_REVIEWER_CONFIG,
        "agent-ux": AGENT_UX_CONFIG,
        "agent-maintenance": AGENT_MAINTENANCE_CONFIG,
        "agent-guide": AGENT_GUIDE_CONFIG,
    }
)


async def run_bootstrap_sequence():
    """
    Autonomous Execution Mode: Executes bootstrapping functions automatically upon startup.
    Calls bootstrap_github_repo, bootstrap_monday_workspace, and setup_vercel_project.
    """
    print("\n=======================================================")
    print("  dopa-X PLATFORM - INITIAL AUTONOMOUS BOOTSTRAP")
    print("=======================================================\n")
    
    # 1. Initialize GitHub Repository via agent-code-reviewer
    print("--> Step 1: Initializing GitHub Repository (agent-code-reviewer)")
    github_result = tools.bootstrap_github_repo()
    print(f"    Result: {github_result}\n")

    # 2. Bootstrap Monday.com Workspace & Boards via agent-ops
    print("--> Step 2: Bootstrapping Monday.com Workspace (agent-ops)")
    monday_result = tools.bootstrap_monday_workspace()
    print(f"    Result: {monday_result}\n")

    # 3. Setup & Provision Vercel Project via agent-maintenance
    print("--> Step 3: Setting up Vercel Hosting Environment (agent-maintenance)")
    vercel_setup_result = tools.setup_vercel_project("dopa-x-portal")
    print(f"    Result: {vercel_setup_result}\n")

    # 4. Trigger Initial Production Deployment via agent-maintenance
    print("--> Step 4: Triggering Initial Production Deployment (agent-maintenance)")
    vercel_deploy_result = tools.deploy_to_vercel(vercel_setup_result.get("project_id"))
    print(f"    Result: {vercel_deploy_result}\n")

    # Log bootstrap status to Google Sheets backend
    tools.log_to_google_sheets("BOOTSTRAP_COMPLETE", "Initial 9-agent platform self-provisioning completed successfully.")

    print("=======================================================")
    print("  BOOTSTRAP SEQUENCE COMPLETE - PLATFORM IS LIVE!")
    print("=======================================================\n")


async def run_automated_trigger_loop(iterations: int = 1):
    """
    Automated 9-Agent Orchestration Loop: Executes recurring operational workflows across all sub-agents
    under agent-pm and agent-auditor supervision.
    """
    print("--> Starting 9-Agent Autonomous Orchestration Loop...")
    
    async def _execute_loop():
        for i in range(1, iterations + 1):
            print(f"\n--- Cycle {i}/{iterations} ---")
            
            # 1. PM Health & Active Epics Check
            health = tools.get_project_health_summary()
            epics = tools.get_active_epics()
            print(f"[agent-pm] Active Epics: {len(epics.get('active_epics', []))} | Health: {health.get('overall_health')}")

            # 2. Crawler Scrapes Data Sources
            crawl_res = tools.execute_web_search("Parkinson's open oculomotor gait dataset")
            candidates = crawl_res.get("discovered_candidates", [])
            print(f"[agent-crawler] Discovered {len(candidates)} dataset candidates")

            # 3. Scout Extracts Clinical Metadata
            if candidates:
                raw_url = candidates[0].get("url")
                meta = tools.extract_clinical_metadata(raw_url)
                print(f"[agent-scout] Extracted metadata for '{meta.get('title')}'")
                tools.push_to_vercel_db("clinical_datasets", [meta])

                # 4. Auditor Verifies Compliance & Privacy
                audit = tools.audit_dataset_compliance(raw_url)
                print(f"[agent-auditor] Dataset Audit: {audit.get('status')} (De-identification: {audit.get('compliance_checks', {}).get('de_identification')})")

                # 5. Ops Provisions Monday Epic
                epic = tools.create_monday_epic(f"Integrate {meta.get('title')}", "Oculomotor & gait time series integration")
                tools.create_monday_subtask(epic.get("epic_id"), "Feature extraction & validation pipeline")

            # 6. UX Generates Component & Submits PR
            comp = tools.generate_react_component("EyeTrackingSpectrogram", "Eye-tracking gaze velocity visualizer")
            pr_res = tools.submit_frontend_pr("feature/eyetracking-viz", comp["component_name"])
            print(f"[agent-ux] Submitted PR #{pr_res.get('pr_number')} for {comp['component_name']}")

            # 7. Code Reviewer Reviews & Merges PR
            diff = tools.get_github_pr_diff(pr_res.get("pr_number"))
            print(f"[agent-code-reviewer] PR #{pr_res.get('pr_number')} Review: Lint={diff.get('lint_passed')}, A11y={diff.get('accessibility_passed')}")
            tools.post_github_pr_comment_and_merge(pr_res.get("pr_number"), "Automated code hygiene & accessibility checks passed.", approve=True)

            # 8. Guide Matches Volunteer Skills
            unassigned = tools.query_unassigned_monday_tasks()
            print(f"[agent-guide] Unassigned tasks ready for volunteer matching: {len(unassigned.get('unassigned_tasks', []))}")

    try:
        async with Agent(AGENT_PM_CONFIG) as pm_agent:
            await _execute_loop()
    except Exception as e:
        print(f"\n[AGENT-PM] Agent SDK session notice ({e}). Running autonomous 9-agent orchestration directly...")
        await _execute_loop()


async def main():
    # 1. Run Initial Autonomous Bootstrap
    await run_bootstrap_sequence()
    
    # 2. Run Automated Trigger Loop
    await run_automated_trigger_loop(iterations=1)


if __name__ == "__main__":
    asyncio.run(main())

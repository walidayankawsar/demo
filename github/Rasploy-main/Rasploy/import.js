document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const deployBtn = document.getElementById('deploy-btn');
    let currentStep = 0;

    // Initialize
    showStep(currentStep);

    // Button event listeners
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    deployBtn.addEventListener('click', deployProject);

    // Provider buttons
    document.querySelectorAll('.provider-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulate authentication
            simulateAuth(this.classList.contains('github') ? 'github' : 
                         this.classList.contains('gitlab') ? 'gitlab' : 'bitbucket');
        });
    });

    // Step navigation functions
    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.toggle('active', index === step);
        });

        // Update buttons
        prevBtn.disabled = step === 0;
        nextBtn.style.display = step === steps.length - 1 ? 'none' : 'block';
        deployBtn.style.display = step === steps.length - 1 ? 'block' : 'none';
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            
            // Simulate loading repositories when reaching step 2
            if (currentStep === 1) {
                loadRepositories();
            }
            
            // Simulate loading branches when reaching step 3
            if (currentStep === 2) {
                loadBranches();
            }
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // Simulate authentication
    function simulateAuth(provider) {
        console.log(`Connecting to ${provider}...`);
        // In a real app, you would redirect to OAuth flow or open a popup
        
        // Simulate successful connection after 1.5 seconds
        setTimeout(() => {
            alert(`Successfully connected to ${provider}!`);
            nextStep();
        }, 1500);
    }

    // Simulate loading repositories
    function loadRepositories() {
        const repoList = document.getElementById('repo-list');
        repoList.innerHTML = '<div class="repo-placeholder"><i class="fas fa-spinner fa-spin"></i> Loading your repositories...</div>';

        // Simulate API call delay
        setTimeout(() => {
            // Mock data - in a real app, you would fetch from your backend
            const mockRepos = [
                { name: 'my-django-app', description: 'My personal Django project', private: false },
                { name: 'ecommerce-site', description: 'Django ecommerce platform', private: false },
                { name: 'portfolio', description: 'Personal portfolio website', private: false },
                { name: 'blog-project', description: 'Django blog with CMS features', private: true }
            ];

            repoList.innerHTML = '';
            mockRepos.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.className = 'repo-item';
                repoItem.innerHTML = `
                    <div class="repo-name">${repo.name} ${repo.private ? '<i class="fas fa-lock"></i>' : ''}</div>
                    <div class="repo-desc">${repo.description}</div>
                `;
                
                repoItem.addEventListener('click', function() {
                    document.querySelectorAll('.repo-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    document.getElementById('project-name').value = repo.name;
                });
                
                repoList.appendChild(repoItem);
            });
        }, 2000);
    }

    // Simulate loading branches
    function loadBranches() {
        const branchSelect = document.getElementById('branch-select');
        branchSelect.innerHTML = '<option value="">Loading branches...</option>';

        // Simulate API call delay
        setTimeout(() => {
            // Mock data
            const mockBranches = ['main', 'develop', 'feature/auth', 'bugfix/login'];

            branchSelect.innerHTML = '';
            mockBranches.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch;
                option.textContent = branch;
                if (branch === 'main') {
                    option.selected = true;
                }
                branchSelect.appendChild(option);
            });
        }, 1500);
    }

    // Deploy project
    function deployProject() {
        const projectName = document.getElementById('project-name').value;
        const branch = document.getElementById('branch-select').value;
        const pythonVersion = document.getElementById('python-version').value;
        const autoDeploy = document.getElementById('auto-deploy').checked;

        if (!projectName || !branch) {
            alert('Please fill in all required fields');
            return;
        }

        console.log('Deploying:', { projectName, branch, pythonVersion, autoDeploy });
        
        // Show loading state
        deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
        deployBtn.disabled = true;

        // Simulate deployment
        setTimeout(() => {
            alert(`Success! Your project ${projectName} is being deployed.`);
            // Redirect to dashboard or project page
            window.location.href = '/dashboard/';
        }, 3000);
    }

    // Search functionality
    const repoSearch = document.getElementById('repo-search');
    if (repoSearch) {
        repoSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.repo-item').forEach(item => {
                const repoName = item.querySelector('.repo-name').textContent.toLowerCase();
                item.style.display = repoName.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
});
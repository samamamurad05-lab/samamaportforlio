// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch('https://api.github.com/users/samamamurad05-lab/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        // Check if repos exist
        if (repos.length === 0 || repos.message) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>🚀 Projects coming soon! Currently organizing my work.</p>
                    <p>Check back later or visit my 
                        <a href="https://github.com/samamamurad05-lab" target="_blank" style="color: var(--primary);">
                            GitHub profile
                        </a>.
                    </p>
                </div>
            `;
            return;
        }

        // Display repositories
        container.innerHTML = repos.map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'A project showcasing my development skills'}</p>
                <small>⭐ ${repo.stargazers_count} stars • ${repo.language || 'Code'}</small>
                <br>
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    View on GitHub →
                </a>
            </div>
        `).join('');
        
    } catch (error) {
        container.innerHTML = `
            <div class="empty-state">
                <p>🚀 Projects section ready for your amazing work!</p>
                <p>Add your projects to 
                    <a href="https://github.com/samamamurad05-lab" target="_blank" style="color: var(--primary);">
                        GitHub
                    </a> 
                    and they will appear here automatically.
                </p>
            </div>
        `;
    }
}

// Load projects when page loads
fetchGitHubRepos();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

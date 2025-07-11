class FootballManager {
    constructor() {
        this.currentCareer = null;
        this.currentTab = 'overview';
        this.formations = this.getFormations();
        this.sortOrder = 'asc';
        this.sortBy = 'name';
        this.selectedFieldPosition = null;
        
        this.init();
    }

    // Adjusted formations for VERTICAL field
    getFormations() {
        return {
            '4231': [
                { x: 50, y: 10, position: 'GK' },  // Goalkeeper at top for vertical
                { x: 20, y: 25, position: 'LB' }, { x: 36, y: 25, position: 'CB' }, 
                { x: 64, y: 25, position: 'CB' }, { x: 80, y: 25, position: 'RB' },
                { x: 35, y: 45, position: 'CDM' }, { x: 65, y: 45, position: 'CDM' },
                { x: 20, y: 65, position: 'LW' }, { x: 50, y: 65, position: 'CAM' }, 
                { x: 80, y: 65, position: 'RW' },
                { x: 50, y: 85, position: 'ST' }
            ],
            '433': [
                { x: 50, y: 10, position: 'GK' },
                { x: 20, y: 25, position: 'LB' }, { x: 36, y: 25, position: 'CB' }, 
                { x: 64, y: 25, position: 'CB' }, { x: 80, y: 25, position: 'RB' },
                { x: 35, y: 50, position: 'CM' }, { x: 50, y: 50, position: 'CM' }, 
                { x: 65, y: 50, position: 'CM' },
                { x: 20, y: 75, position: 'LW' }, { x: 50, y: 75, position: 'ST' }, 
                { x: 80, y: 75, position: 'RW' }
            ],
            '343': [
                { x: 50, y: 10, position: 'GK' },
                { x: 30, y: 25, position: 'CB' }, { x: 50, y: 25, position: 'CB' }, 
                { x: 70, y: 25, position: 'CB' },
                { x: 15, y: 50, position: 'LM' }, { x: 38, y: 50, position: 'CM' }, 
                { x: 62, y: 50, position: 'CM' }, { x: 85, y: 50, position: 'RM' },
                { x: 30, y: 75, position: 'ST' }, { x: 50, y: 75, position: 'ST' }, 
                { x: 70, y: 75, position: 'ST' }
            ],
            '523': [
                { x: 50, y: 10, position: 'GK' },
                { x: 15, y: 25, position: 'LB' }, { x: 30, y: 25, position: 'CB' }, 
                { x: 50, y: 25, position: 'CB' }, { x: 70, y: 25, position: 'CB' }, 
                { x: 85, y: 25, position: 'RB' },
                { x: 35, y: 50, position: 'CM' }, { x: 50, y: 50, position: 'CM' }, 
                { x: 65, y: 50, position: 'CM' },
                { x: 35, y: 75, position: 'ST' }, { x: 65, y: 75, position: 'ST' }
            ],
            '442': [
                { x: 50, y: 10, position: 'GK' },
                { x: 20, y: 25, position: 'LB' }, { x: 36, y: 25, position: 'CB' }, 
                { x: 64, y: 25, position: 'CB' }, { x: 80, y: 25, position: 'RB' },
                { x: 20, y: 55, position: 'LM' }, { x: 40, y: 55, position: 'CM' }, 
                { x: 60, y: 55, position: 'CM' }, { x: 80, y: 55, position: 'RM' },
                { x: 40, y: 75, position: 'ST' }, { x: 60, y: 75, position: 'ST' }
            ],
            '41212': [
                { x: 50, y: 10, position: 'GK' },
                { x: 20, y: 25, position: 'LB' }, { x: 36, y: 25, position: 'CB' }, 
                { x: 64, y: 25, position: 'CB' }, { x: 80, y: 25, position: 'RB' },
                { x: 50, y: 40, position: 'CDM' },
                { x: 35, y: 55, position: 'CM' }, { x: 65, y: 55, position: 'CM' },
                { x: 50, y: 70, position: 'CAM' },
                { x: 38, y: 85, position: 'ST' }, { x: 62, y: 85, position: 'ST' }
            ],
            '424': [
                { x: 50, y: 10, position: 'GK' },
                { x: 20, y: 25, position: 'LB' }, { x: 36, y: 25, position: 'CB' }, 
                { x: 64, y: 25, position: 'CB' }, { x: 80, y: 25, position: 'RB' },
                { x: 40, y: 55, position: 'CM' }, { x: 60, y: 55, position: 'CM' },
                { x: 20, y: 75, position: 'LW' }, { x: 40, y: 75, position: 'ST' }, 
                { x: 60, y: 75, position: 'ST' }, { x: 80, y: 75, position: 'RW' }
            ]
        };
    }

    loadCareers() {
        const saved = localStorage.getItem('footballManagerCareers');
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }

    saveCareers(careers) {
        localStorage.setItem('footballManagerCareers', JSON.stringify(careers));
    }

    getCurrentCareerData() {
        if (!this.currentCareer) return null;
        const careers = this.loadCareers();
        return careers.find(c => c.id === this.currentCareer);
    }

    saveCurrentCareerData(data) {
        if (!this.currentCareer) return;
        const careers = this.loadCareers();
        const careerIndex = careers.findIndex(c => c.id === this.currentCareer);
        if (careerIndex !== -1) {
            careers[careerIndex].data = data;
            this.saveCareers(careers);
        }
    }

    getDefaultCareerData() {
        return {
            players: [
                { id: 1, name: "Marcus Johnson", position: "GK", age: 28, level: 85, potential: 87, salary: 75000, contractDuration: 3, transferWorth: 2500000 },
                { id: 2, name: "David Silva", position: "CB", age: 26, level: 82, potential: 88, salary: 65000, contractDuration: 4, transferWorth: 3200000 },
                { id: 3, name: "Oliver Thompson", position: "CB", age: 24, level: 78, potential: 85, salary: 45000, contractDuration: 5, transferWorth: 2100000 },
                { id: 4, name: "Lucas Martinez", position: "LB", age: 22, level: 76, potential: 83, salary: 35000, contractDuration: 4, transferWorth: 1800000 },
                { id: 5, name: "Ryan Anderson", position: "RB", age: 27, level: 80, potential: 82, salary: 50000, contractDuration: 2, transferWorth: 2200000 },
                { id: 6, name: "James Wilson", position: "CDM", age: 29, level: 86, potential: 87, salary: 85000, contractDuration: 2, transferWorth: 3800000 },
                { id: 7, name: "Alex Rodriguez", position: "CM", age: 25, level: 83, potential: 89, salary: 70000, contractDuration: 3, transferWorth: 4200000 },
                { id: 8, name: "Michael Brown", position: "CAM", age: 23, level: 79, potential: 87, salary: 55000, contractDuration: 4, transferWorth: 3500000 },
                { id: 9, name: "Noah Garcia", position: "LW", age: 21, level: 75, potential: 88, salary: 40000, contractDuration: 5, transferWorth: 2800000 },
                { id: 10, name: "Ethan Davis", position: "RW", age: 26, level: 81, potential: 84, salary: 60000, contractDuration: 3, transferWorth: 3000000 },
                { id: 11, name: "Sebastian Lee", position: "ST", age: 24, level: 84, potential: 90, salary: 90000, contractDuration: 4, transferWorth: 5200000 },
                { id: 12, name: "Carlos Vega", position: "GK", age: 32, level: 79, potential: 79, salary: 40000, contractDuration: 1, transferWorth: 800000 },
                { id: 13, name: "Pedro Santos", position: "CB", age: 30, level: 77, potential: 78, salary: 38000, contractDuration: 2, transferWorth: 1200000 },
                { id: 14, name: "Marco Rossi", position: "CM", age: 19, level: 68, potential: 84, salary: 15000, contractDuration: 5, transferWorth: 1500000 },
                { id: 15, name: "Ahmed Hassan", position: "ST", age: 20, level: 72, potential: 86, salary: 25000, contractDuration: 4, transferWorth: 2000000 },
                { id: 16, name: "Ivan Petrov", position: "LW", age: 28, level: 76, potential: 77, salary: 42000, contractDuration: 2, transferWorth: 1600000 },
                { id: 17, name: "Jean Dupont", position: "RB", age: 25, level: 74, potential: 80, salary: 32000, contractDuration: 3, transferWorth: 1400000 },
                { id: 18, name: "Kim Min-jun", position: "CAM", age: 22, level: 77, potential: 85, salary: 48000, contractDuration: 4, transferWorth: 2600000 }
            ],
            scoutTargets: [
                { id: 1001, name: "João Silva", position: "LW", age: 20, level: 75, potential: 88, scoutRating: 4.5, transferInterest: "High", loanInterest: "Medium", nextSteps: "Make Approach", transferWorth: 2800000 },
                { id: 1002, name: "Pierre Dubois", position: "CM", age: 23, level: 80, potential: 86, scoutRating: 4, transferInterest: "Medium", loanInterest: "Low", nextSteps: "Continue Monitoring", transferWorth: 3500000 },
                { id: 1003, name: "Hans Mueller", position: "CB", age: 26, level: 83, potential: 85, scoutRating: 3.5, transferInterest: "Low", loanInterest: "Very Low", nextSteps: "On Hold", transferWorth: 4200000 }
            ],
            formation: '4231',
            lineup: {
                starting: Array(11).fill(null),
                bench: Array(7).fill(null)
            },
            futurePlanning: {
                '26/27': { toUse: [], sell: [], loan: [], dontKnow: [] },
                '27/28': { toUse: [], sell: [], loan: [], dontKnow: [] },
                '28/29': { toUse: [], sell: [], loan: [], dontKnow: [] }
            }
        };
    }

    init() {
        this.renderCareerSelection();
        this.setupEventListeners();
    }

    renderCareerSelection() {
        const careers = this.loadCareers();
        const careersGrid = document.getElementById('careers-grid');
        const noCareers = document.getElementById('no-careers');

        if (careers.length === 0) {
            careersGrid.style.display = 'none';
            noCareers.style.display = 'block';
        } else {
            careersGrid.style.display = 'grid';
            noCareers.style.display = 'none';
            
            careersGrid.innerHTML = '';
            careers.forEach(career => {
                const careerCard = this.createCareerCard(career);
                careersGrid.appendChild(careerCard);
            });
        }
    }

    createCareerCard(career) {
        const card = document.createElement('div');
        card.className = 'career-card';
        
        const playerCount = career.data.players ? career.data.players.length : 0;
        const scoutCount = career.data.scoutTargets ? career.data.scoutTargets.length : 0;
        
        card.innerHTML = `
            <div class="career-card-header">
                <div>
                    <div class="career-card-title">${career.name}</div>
                    <div class="career-card-team">${career.teamName}</div>
                </div>
                <div class="career-card-actions">
                    <button class="career-action-btn edit" onclick="footballManager.editCareer(${career.id})" title="Edit Career">✏️</button>
                    <button class="career-action-btn delete" onclick="footballManager.deleteCareer(${career.id})" title="Delete Career">🗑️</button>
                </div>
            </div>
            <div class="career-card-description">${career.description || 'No description available'}</div>
            <div class="career-card-stats">
                <div class="career-stat">
                    <div class="career-stat-value">${playerCount}</div>
                    <div class="career-stat-label">Players</div>
                </div>
                <div class="career-stat">
                    <div class="career-stat-value">${scoutCount}</div>
                    <div class="career-stat-label">Scouts</div>
                </div>
                <div class="career-stat">
                    <div class="career-stat-value">${new Date(career.created).toLocaleDateString()}</div>
                    <div class="career-stat-label">Created</div>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('career-action-btn')) {
                this.loadCareer(career.id);
            }
        });

        return card;
    }

    loadCareer(careerId) {
        const careers = this.loadCareers();
        const career = careers.find(c => c.id === careerId);
        
        if (career) {
            this.currentCareer = careerId;
            this.data = career.data;
            
            // Update UI to show current career name
            document.getElementById('current-career-name').textContent = career.name;
            
            // Show squad manager and hide career selection
            document.getElementById('career-selection').style.display = 'none';
            document.getElementById('squad-manager').style.display = 'block';
            
            // Initialize squad manager components
            this.renderOverview();
            this.renderTactics();
            this.renderPlanning();
            this.renderScouting();
            this.updatePositionFilters();
        }
    }

    backToCareers() {
        // Hide squad manager and show career selection
        document.getElementById('squad-manager').style.display = 'none';
        document.getElementById('career-selection').style.display = 'block';
        
        this.currentCareer = null;
        this.data = null;
        
        // Re-render career selection to show updated stats
        this.renderCareerSelection();
    }

    createCareer(name, teamName, description) {
        const careers = this.loadCareers();
        const newCareer = {
            id: Date.now(),
            name: name,
            teamName: teamName,
            description: description,
            created: new Date().toISOString(),
            data: this.getDefaultCareerData()
        };
        
        careers.push(newCareer);
        this.saveCareers(careers);
        this.renderCareerSelection();
        return newCareer;
    }

    editCareer(careerId) {
        const careers = this.loadCareers();
        const career = careers.find(c => c.id === careerId);
        
        if (career) {
            // Populate edit form (reuse create career modal)
            document.getElementById('career-name').value = career.name;
            document.getElementById('team-name').value = career.teamName;
            document.getElementById('career-description').value = career.description || '';
            
            // Store career ID for editing
            document.getElementById('create-career-form').dataset.editId = careerId;
            document.querySelector('#create-career-modal h3').textContent = 'Edit Career';
            document.querySelector('#create-career-form button[type="submit"]').textContent = 'Save Changes';
            
            document.getElementById('create-career-modal').classList.add('show');
        }
    }

    deleteCareer(careerId) {
        if (confirm('Are you sure you want to delete this career? This action cannot be undone.')) {
            const careers = this.loadCareers();
            const filteredCareers = careers.filter(c => c.id !== careerId);
            this.saveCareers(filteredCareers);
            this.renderCareerSelection();
        }
    }

    saveData() {
        if (this.currentCareer && this.data) {
            this.saveCurrentCareerData(this.data);
        }
    }

    setupEventListeners() {
        // Career management
        document.getElementById('create-career-btn').addEventListener('click', () => {
            // Reset form for creating new career
            document.getElementById('create-career-form').reset();
            delete document.getElementById('create-career-form').dataset.editId;
            document.querySelector('#create-career-modal h3').textContent = 'Create New Career';
            document.querySelector('#create-career-form button[type="submit"]').textContent = 'Create Career';
            
            document.getElementById('create-career-modal').classList.add('show');
        });

        document.getElementById('create-career-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('career-name').value;
            const teamName = document.getElementById('team-name').value;
            const description = document.getElementById('career-description').value;
            const formElement = e.target;
            
            if (formElement.dataset.editId) {
                // Edit existing career
                const careerId = parseInt(formElement.dataset.editId);
                const careers = this.loadCareers();
                const careerIndex = careers.findIndex(c => c.id === careerId);
                
                if (careerIndex !== -1) {
                    careers[careerIndex].name = name;
                    careers[careerIndex].teamName = teamName;
                    careers[careerIndex].description = description;
                    this.saveCareers(careers);
                    this.renderCareerSelection();
                }
                
                delete formElement.dataset.editId;
            } else {
                // Create new career
                this.createCareer(name, teamName, description);
            }
            
            document.getElementById('create-career-modal').classList.remove('show');
        });

        document.getElementById('cancel-career').addEventListener('click', () => {
            document.getElementById('create-career-modal').classList.remove('show');
        });

        document.getElementById('back-to-careers').addEventListener('click', () => {
            this.backToCareers();
        });

        // Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Overview controls
        document.getElementById('search-input').addEventListener('input', () => this.renderOverview());
        document.getElementById('position-filter').addEventListener('change', () => this.renderOverview());
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderOverview();
        });
        document.getElementById('sort-order').addEventListener('click', () => {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            document.getElementById('sort-order').textContent = this.sortOrder === 'asc' ? '↑' : '↓';
            this.renderOverview();
        });

        // Player detail navigation
        document.getElementById('back-to-overview').addEventListener('click', () => {
            this.switchTab('overview');
        });

        // Edit player
        document.getElementById('edit-player-btn').addEventListener('click', () => {
            const playerId = parseInt(document.getElementById('edit-player-btn').dataset.playerId);
            this.showEditPlayer(playerId);
        });

        // Scouting controls
        document.getElementById('scout-search-input').addEventListener('input', () => this.renderScouting());
        document.getElementById('scout-position-filter').addEventListener('change', () => this.renderScouting());
        document.getElementById('scout-rating-filter').addEventListener('change', () => this.renderScouting());

        // Add buttons
        document.getElementById('add-player-btn').addEventListener('click', () => {
            document.getElementById('add-player-modal').classList.add('show');
        });

        document.getElementById('add-scout-target-btn').addEventListener('click', () => {
            document.getElementById('add-scout-modal').classList.add('show');
        });

        document.getElementById('add-season-player-btn').addEventListener('click', () => {
            document.getElementById('add-future-player-modal').classList.add('show');
        });

        document.getElementById('advance-seasons-btn').addEventListener('click', () => {
            this.advanceSeasons();
        });

        // Form submissions
        document.getElementById('add-player-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPlayer();
        });

        document.getElementById('edit-player-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.editPlayer();
        });

        document.getElementById('add-scout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addScoutTarget();
        });

        document.getElementById('add-future-player-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFuturePlayer();
        });

        // Cancel buttons
        document.getElementById('cancel-add').addEventListener('click', () => {
            document.getElementById('add-player-modal').classList.remove('show');
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            document.getElementById('edit-player-modal').classList.remove('show');
        });

        document.getElementById('cancel-scout').addEventListener('click', () => {
            document.getElementById('add-scout-modal').classList.remove('show');
        });

        document.getElementById('cancel-future').addEventListener('click', () => {
            document.getElementById('add-future-player-modal').classList.remove('show');
        });

        // Formation buttons
        document.querySelectorAll('.formation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const formation = e.target.dataset.formation;
                this.changeFormation(formation);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('show');
            });
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        if (tabName === 'player-detail') {
            document.getElementById('player-detail-tab').classList.add('active');
        } else {
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }

        this.currentTab = tabName;

        // Re-render current tab if needed
        if (tabName === 'tactics') {
            this.renderTactics();
        } else if (tabName === 'planning') {
            this.renderPlanning();
        } else if (tabName === 'scouting') {
            this.renderScouting();
        }
    }

    // Star rating conversion
    convertToStars(rating) {
        const stars = rating / 20; // Convert 1-99 to 0-5 scale
        const fullStars = Math.floor(stars);
        const hasHalfStar = (stars - fullStars) >= 0.5;
        
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<span class="star filled">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<span class="star half">★</span>';
            } else {
                starsHtml += '<span class="star">☆</span>';
            }
        }
        
        return `<div class="star-rating">${starsHtml}</div>`;
    }

    updatePositionFilters() {
        if (!this.data) return;

        const positions = [...new Set(this.data.players.map(p => p.position))].sort();
        const scoutPositions = [...new Set(this.data.scoutTargets.map(p => p.position))].sort();
        const allPositions = [...new Set([...positions, ...scoutPositions])].sort();
        
        // Update squad position filter
        const squadSelect = document.getElementById('position-filter');
        const currentValue = squadSelect.value;
        squadSelect.innerHTML = '<option value="">All positions</option>';
        positions.forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            squadSelect.appendChild(option);
        });
        squadSelect.value = currentValue;

        // Update scout position filter
        const scoutSelect = document.getElementById('scout-position-filter');
        const currentScoutValue = scoutSelect.value;
        scoutSelect.innerHTML = '<option value="">All positions</option>';
        allPositions.forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            scoutSelect.appendChild(option);
        });
        scoutSelect.value = currentScoutValue;
    }

    getFilteredPlayers() {
        if (!this.data) return [];
        
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const positionFilter = document.getElementById('position-filter').value;

        let filtered = this.data.players.filter(player => {
            const matchesSearch = player.name.toLowerCase().includes(searchTerm);
            const matchesPosition = !positionFilter || player.position === positionFilter;
            return matchesSearch && matchesPosition;
        });

        return this.sortPlayers(filtered);
    }

    getFilteredScoutTargets() {
        if (!this.data) return [];
        
        const searchTerm = document.getElementById('scout-search-input').value.toLowerCase();
        const positionFilter = document.getElementById('scout-position-filter').value;
        const ratingFilter = document.getElementById('scout-rating-filter').value;

        let filtered = this.data.scoutTargets.filter(target => {
            const matchesSearch = target.name.toLowerCase().includes(searchTerm);
            const matchesPosition = !positionFilter || target.position === positionFilter;
            const matchesRating = !ratingFilter || target.scoutRating >= parseFloat(ratingFilter);
            return matchesSearch && matchesPosition && matchesRating;
        });

        return this.sortPlayers(filtered);
    }

    sortPlayers(players) {
        return players.sort((a, b) => {
            let aVal = a[this.sortBy];
            let bVal = b[this.sortBy];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (this.sortOrder === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }

    renderOverview() {
        if (!this.data) return;
        
        const tbody = document.getElementById('players-tbody');
        const players = this.getFilteredPlayers();

        tbody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${player.name}</strong></td>
                <td>${player.position}</td>
                <td>${player.age}</td>
                <td>${this.convertToStars(player.level)}</td>
                <td>${this.convertToStars(player.potential)}</td>
                <td>€${player.salary.toLocaleString()}</td>
                <td>${player.contractDuration}y</td>
                <td>€${player.transferWorth.toLocaleString()}</td>
                <td>
                    <button class="action-btn edit" onclick="footballManager.showPlayerDetail(${player.id})">View</button>
                    <button class="action-btn edit" onclick="footballManager.showEditPlayer(${player.id})">Edit</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    renderScouting() {
        if (!this.data) return;
        
        const tbody = document.getElementById('scout-targets-tbody');
        const targets = this.getFilteredScoutTargets();

        tbody.innerHTML = '';

        targets.forEach(target => {
            const row = document.createElement('tr');
            
            const interestClass = this.getInterestClass(target.transferInterest);
            const loanInterestClass = this.getInterestClass(target.loanInterest);
            const stepsClass = this.getStepsClass(target.nextSteps);
            
            row.innerHTML = `
                <td><strong>${target.name}</strong></td>
                <td>${target.position}</td>
                <td>${target.age}</td>
                <td>${this.convertToStars(target.level)}</td>
                <td>${this.convertToStars(target.potential)}</td>
                <td>${this.convertToStars(target.scoutRating * 20)}</td>
                <td class="${interestClass}">${target.transferInterest}</td>
                <td class="${loanInterestClass}">${target.loanInterest}</td>
                <td class="${stepsClass}">${target.nextSteps}</td>
                <td>€${target.transferWorth.toLocaleString()}</td>
                <td>
                    <button class="action-btn edit" onclick="footballManager.editScoutTarget(${target.id})">Edit</button>
                    <button class="action-btn delete" onclick="footballManager.deleteScoutTarget(${target.id})">Remove</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    getInterestClass(interest) {
        return `interest-${interest.toLowerCase().replace(' ', '-')}`;
    }

    getStepsClass(steps) {
        const stepMap = {
            'Continue Monitoring': 'steps-continue',
            'Make Approach': 'steps-approach',
            'Formal Offer': 'steps-offer',
            'Loan Inquiry': 'steps-loan',
            'On Hold': 'steps-hold',
            'No Longer Interested': 'steps-hold'
        };
        return stepMap[steps] || 'steps-continue';
    }

    showPlayerDetail(playerId) {
        if (!this.data) return;
        
        const player = this.data.players.find(p => p.id === playerId);
        if (!player) return;

        document.getElementById('player-detail-name').textContent = player.name;
        document.getElementById('player-detail-position').textContent = player.position;
        document.getElementById('player-detail-age').textContent = `${player.age} years old`;
        
        document.getElementById('player-current-rating').innerHTML = this.convertToStars(player.level);
        document.getElementById('player-current-value').textContent = `${player.level}/99`;
        
        document.getElementById('player-potential-rating').innerHTML = this.convertToStars(player.potential);
        document.getElementById('player-potential-value').textContent = `${player.potential}/99`;
        
        document.getElementById('player-contract-info').textContent = `${player.contractDuration} years remaining`;
        document.getElementById('player-market-value').textContent = `€${player.transferWorth.toLocaleString()}`;
        document.getElementById('player-wage').textContent = `€${player.salary.toLocaleString()}/week`;
        
        // Determine squad status
        const isInStarting = this.data.lineup.starting.some(p => p && p.id === player.id);
        const isOnBench = this.data.lineup.bench.some(p => p && p.id === player.id);
        let status = 'Available for selection';
        if (isInStarting) status = 'Starting XI';
        else if (isOnBench) status = 'On bench';
        
        document.getElementById('player-squad-status').textContent = status;
        document.getElementById('edit-player-btn').dataset.playerId = player.id;

        this.switchTab('player-detail');
    }

    showEditPlayer(playerId) {
        if (!this.data) return;
        
        const player = this.data.players.find(p => p.id === playerId);
        if (!player) return;

        document.getElementById('edit-player-id').value = player.id;
        document.getElementById('edit-player-name').value = player.name;
        document.getElementById('edit-player-position').value = player.position;
        document.getElementById('edit-player-age').value = player.age;
        document.getElementById('edit-player-level').value = player.level;
        document.getElementById('edit-player-potential').value = player.potential;
        document.getElementById('edit-player-salary').value = player.salary;
        document.getElementById('edit-player-contract').value = player.contractDuration;
        document.getElementById('edit-player-transfer').value = player.transferWorth;

        document.getElementById('edit-player-modal').classList.add('show');
    }

    editPlayer() {
        if (!this.data) return;
        
        const playerId = parseInt(document.getElementById('edit-player-id').value);
        const playerIndex = this.data.players.findIndex(p => p.id === playerId);
        
        if (playerIndex === -1) return;

        this.data.players[playerIndex] = {
            ...this.data.players[playerIndex],
            name: document.getElementById('edit-player-name').value,
            position: document.getElementById('edit-player-position').value,
            age: parseInt(document.getElementById('edit-player-age').value),
            level: parseInt(document.getElementById('edit-player-level').value),
            potential: parseInt(document.getElementById('edit-player-potential').value),
            salary: parseInt(document.getElementById('edit-player-salary').value),
            contractDuration: parseInt(document.getElementById('edit-player-contract').value),
            transferWorth: parseInt(document.getElementById('edit-player-transfer').value)
        };

        this.saveData();
        this.renderOverview();
        this.renderTactics();
        this.renderPlanning();
        this.updatePositionFilters();
        
        document.getElementById('edit-player-modal').classList.remove('show');

        // If we're on the player detail page, refresh it
        if (this.currentTab === 'player-detail') {
            this.showPlayerDetail(playerId);
        }
    }

    addPlayer() {
        if (!this.data) return;
        
        const newPlayer = {
            id: Math.max(...this.data.players.map(p => p.id)) + 1,
            name: document.getElementById('player-name').value,
            position: document.getElementById('player-position').value,
            age: parseInt(document.getElementById('player-age').value),
            level: parseInt(document.getElementById('player-level').value),
            potential: parseInt(document.getElementById('player-potential').value),
            salary: parseInt(document.getElementById('player-salary').value),
            contractDuration: parseInt(document.getElementById('player-contract').value),
            transferWorth: parseInt(document.getElementById('player-transfer').value)
        };

        this.data.players.push(newPlayer);
        this.saveData();
        this.renderOverview();
        this.renderTactics();
        this.renderPlanning();
        this.updatePositionFilters();

        document.getElementById('add-player-modal').classList.remove('show');
        document.getElementById('add-player-form').reset();
        this.resetAddPlayerForm();
    }

    addScoutTarget() {
        if (!this.data) return;
        
        const newTarget = {
            id: Math.max(...this.data.scoutTargets.map(p => p.id)) + 1,
            name: document.getElementById('scout-name').value,
            position: document.getElementById('scout-position').value,
            age: parseInt(document.getElementById('scout-age').value),
            level: parseInt(document.getElementById('scout-level').value),
            potential: parseInt(document.getElementById('scout-potential').value),
            scoutRating: parseFloat(document.getElementById('scout-rating').value),
            transferInterest: document.getElementById('scout-transfer-interest').value,
            loanInterest: document.getElementById('scout-loan-interest').value,
            nextSteps: document.getElementById('scout-next-steps').value,
            transferWorth: parseInt(document.getElementById('scout-transfer').value)
        };

        this.data.scoutTargets.push(newTarget);
        this.saveData();
        this.renderScouting();
        this.updatePositionFilters();

        document.getElementById('add-scout-modal').classList.remove('show');
        document.getElementById('add-scout-form').reset();
        this.resetAddScoutForm();
    }

    addFuturePlayer() {
        if (!this.data) return;
        
        const newPlayer = {
            id: Math.max(...this.data.players.map(p => p.id)) + 1,
            name: document.getElementById('future-player-name').value,
            position: document.getElementById('future-player-position').value,
            age: parseInt(document.getElementById('future-player-age').value),
            level: parseInt(document.getElementById('future-player-level').value),
            potential: parseInt(document.getElementById('future-player-potential').value),
            salary: parseInt(document.getElementById('future-player-salary').value),
            contractDuration: parseInt(document.getElementById('future-player-contract').value),
            transferWorth: parseInt(document.getElementById('future-player-transfer').value)
        };

        this.data.players.push(newPlayer);
        this.saveData();
        this.renderOverview();
        this.renderTactics();
        this.renderPlanning();
        this.updatePositionFilters();

        document.getElementById('add-future-player-modal').classList.remove('show');
        document.getElementById('add-future-player-form').reset();
        this.resetAddFuturePlayerForm();
    }

    resetAddPlayerForm() {
        document.getElementById('player-age').value = 20;
        document.getElementById('player-level').value = 70;
        document.getElementById('player-potential').value = 75;
        document.getElementById('player-salary').value = 30000;
        document.getElementById('player-contract').value = 3;
        document.getElementById('player-transfer').value = 1000000;
    }

    resetAddScoutForm() {
        document.getElementById('scout-age').value = 22;
        document.getElementById('scout-level').value = 70;
        document.getElementById('scout-potential').value = 75;
        document.getElementById('scout-rating').value = 3;
        document.getElementById('scout-transfer').value = 1000000;
    }

    resetAddFuturePlayerForm() {
        document.getElementById('future-player-age').value = 18;
        document.getElementById('future-player-level').value = 60;
        document.getElementById('future-player-potential').value = 80;
        document.getElementById('future-player-salary').value = 20000;
        document.getElementById('future-player-contract').value = 5;
        document.getElementById('future-player-transfer').value = 500000;
    }

    editScoutTarget(targetId) {
        if (!this.data) return;
        
        const target = this.data.scoutTargets.find(t => t.id === targetId);
        if (!target) return;

        // Use the same form as add scout, but populate with existing data
        document.getElementById('scout-name').value = target.name;
        document.getElementById('scout-position').value = target.position;
        document.getElementById('scout-age').value = target.age;
        document.getElementById('scout-level').value = target.level;
        document.getElementById('scout-potential').value = target.potential;
        document.getElementById('scout-rating').value = target.scoutRating;
        document.getElementById('scout-transfer-interest').value = target.transferInterest;
        document.getElementById('scout-loan-interest').value = target.loanInterest;
        document.getElementById('scout-next-steps').value = target.nextSteps;
        document.getElementById('scout-transfer').value = target.transferWorth;

        // Store the ID for editing
        document.getElementById('add-scout-form').dataset.editId = targetId;
        document.querySelector('#add-scout-modal h3').textContent = 'Edit Scout Target';
        document.querySelector('#add-scout-form button[type="submit"]').textContent = 'Save Changes';

        document.getElementById('add-scout-modal').classList.add('show');
    }

    deleteScoutTarget(targetId) {
        if (!this.data) return;
        
        if (confirm('Are you sure you want to remove this scout target?')) {
            this.data.scoutTargets = this.data.scoutTargets.filter(t => t.id !== targetId);
            this.saveData();
            this.renderScouting();
            this.updatePositionFilters();
        }
    }

    advanceSeasons() {
        if (!this.data) return;
        
        const seasons = Object.keys(this.data.futurePlanning);
        const currentSeason = seasons[0];
        const newThirdSeason = this.getNextSeason(seasons[2]);

        // Move data forward
        this.data.futurePlanning[seasons[0]] = this.data.futurePlanning[seasons[1]];
        this.data.futurePlanning[seasons[1]] = this.data.futurePlanning[seasons[2]];
        this.data.futurePlanning[newThirdSeason] = { toUse: [], sell: [], loan: [], dontKnow: [] };

        // Update the keys
        const newPlanning = {};
        newPlanning[seasons[1]] = this.data.futurePlanning[seasons[0]];
        newPlanning[seasons[2]] = this.data.futurePlanning[seasons[1]];
        newPlanning[newThirdSeason] = this.data.futurePlanning[newThirdSeason];

        this.data.futurePlanning = newPlanning;
        this.saveData();
        this.renderPlanning();
    }

    getNextSeason(currentSeason) {
        const [startYear, endYear] = currentSeason.split('/').map(year => parseInt(year));
        return `${startYear + 1}/${endYear + 1}`;
    }

    changeFormation(formation) {
        if (!this.data) return;
        
        this.data.formation = formation;
        this.data.lineup.starting = Array(11).fill(null);
        this.saveData();

        document.querySelectorAll('.formation-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.formation === formation);
        });

        this.renderTactics();
    }

    renderTactics() {
        if (!this.data) return;
        
        this.renderFieldPositions();
        this.renderBenchPositions();
        this.renderAvailablePlayers();
        this.clearSelectedPlayerInfo();
    }

    renderFieldPositions() {
        if (!this.data) return;
        
        const container = document.getElementById('field-positions');
        const formation = this.formations[this.data.formation];
        
        container.innerHTML = '';

        formation.forEach((pos, index) => {
            const positionElement = document.createElement('div');
            positionElement.className = 'field-position';
            positionElement.style.left = `${pos.x}%`;
            positionElement.style.top = `${pos.y}%`;
            positionElement.dataset.index = index;
            
            const assignedPlayer = this.data.lineup.starting[index];
            if (assignedPlayer) {
                positionElement.classList.add('occupied');
                positionElement.innerHTML = `<div style="text-align: center; font-size: 0.6rem; line-height: 1.1;">
                    ${assignedPlayer.name.split(' ')[0]}<br>
                    <span style="font-size: 0.5rem; opacity: 0.8;">${assignedPlayer.position}</span>
                </div>`;
            } else {
                positionElement.textContent = pos.position;
            }

            // Add click handler for selection
            positionElement.addEventListener('click', () => {
                this.selectFieldPosition(index);
            });

            this.addDropZone(positionElement, 'field', index);
            container.appendChild(positionElement);
        });
    }

    selectFieldPosition(index) {
        // Remove previous selection
        document.querySelectorAll('.field-position').forEach(pos => {
            pos.classList.remove('selected');
        });
        document.querySelectorAll('.bench-position').forEach(pos => {
            pos.classList.remove('selected');
        });

        // Select current position
        const positionElement = document.querySelector(`.field-position[data-index="${index}"]`);
        positionElement.classList.add('selected');
        this.selectedFieldPosition = index;

        // Show player info
        const assignedPlayer = this.data.lineup.starting[index];
        this.updateSelectedPlayerInfo(assignedPlayer);
    }

    selectBenchPosition(index) {
        // Remove previous selection
        document.querySelectorAll('.field-position').forEach(pos => {
            pos.classList.remove('selected');
        });
        document.querySelectorAll('.bench-position').forEach(pos => {
            pos.classList.remove('selected');
        });

        // Select current position
        const positionElement = document.querySelector(`.bench-position[data-index="${index + 11}"]`);
        positionElement.classList.add('selected');
        this.selectedFieldPosition = index + 11;

        // Show player info
        const assignedPlayer = this.data.lineup.bench[index];
        this.updateSelectedPlayerInfo(assignedPlayer);
    }

    updateSelectedPlayerInfo(player) {
        const infoContainer = document.getElementById('selected-player-info');
        
        if (player) {
            infoContainer.innerHTML = `
                <h3>${player.name}</h3>
                <div class="player-info-grid">
                    <div class="player-info-item">
                        <span class="player-info-label">Position</span>
                        <span class="player-info-value">${player.position}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Age</span>
                        <span class="player-info-value">${player.age}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Current Level</span>
                        <span class="player-info-value">${this.convertToStars(player.level)}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Potential</span>
                        <span class="player-info-value">${this.convertToStars(player.potential)}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Transfer Value</span>
                        <span class="player-info-value">€${player.transferWorth.toLocaleString()}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Weekly Wage</span>
                        <span class="player-info-value">€${player.salary.toLocaleString()}</span>
                    </div>
                </div>
            `;
        } else {
            infoContainer.innerHTML = `
                <h3>Player Information</h3>
                <p>Select a position to view player details</p>
            `;
        }
    }

    clearSelectedPlayerInfo() {
        const infoContainer = document.getElementById('selected-player-info');
        infoContainer.innerHTML = `
            <h3>Player Information</h3>
            <p>Select a position to view player details</p>
        `;
        this.selectedFieldPosition = null;
    }

    renderBenchPositions() {
        if (!this.data) return;
        
        const container = document.getElementById('bench-positions');
        container.innerHTML = '';

        for (let i = 0; i < 7; i++) {
            const positionElement = document.createElement('div');
            positionElement.className = 'bench-position';
            positionElement.dataset.index = i + 11;
            
            const assignedPlayer = this.data.lineup.bench[i];
            if (assignedPlayer) {
                positionElement.classList.add('occupied');
                positionElement.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 0.85rem; font-weight: bold;">${assignedPlayer.name.split(' ')[0]}</div>
                        <div style="font-size: 0.7rem; opacity: 0.8;">${assignedPlayer.position}</div>
                    </div>
                `;
            } else {
                positionElement.innerHTML = `<div style="color: var(--text-muted);">Bench ${i + 1}</div>`;
            }

            // Add click handler for selection
            positionElement.addEventListener('click', () => {
                this.selectBenchPosition(i);
            });

            this.addDropZone(positionElement, 'bench', i + 11);
            container.appendChild(positionElement);
        }
    }

    renderAvailablePlayers() {
        if (!this.data) return;
        
        const container = document.getElementById('available-players');
        container.innerHTML = '';

        this.data.players.forEach(player => {
            const playerCard = this.createPlayerCard(player, true);
            container.appendChild(playerCard);
        });
    }

    createPlayerCard(player, isDraggable = false, onRemove = null) {
        const card = document.createElement('div');
        card.className = 'player-card';
        if (isDraggable) {
            card.draggable = true;
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify(player));
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        }

        let removeBtn = '';
        if (onRemove) {
            removeBtn = `<button class="remove-btn" onclick="event.stopPropagation(); (${onRemove})(${player.id})">&times;</button>`;
        }

        card.innerHTML = `
            ${removeBtn}
            <div class="player-card-name">${player.name}</div>
            <div class="player-card-details">
                <div>Position: ${player.position}</div>
                <div>Age: ${player.age}</div>
                <div>Level: ${this.convertToStars(player.level)}</div>
                <div>Potential: ${this.convertToStars(player.potential)}</div>
            </div>
        `;

        if (!isDraggable) {
            card.addEventListener('click', () => this.showPlayerDetail(player.id));
        }

        return card;
    }

    addDropZone(element, type, index) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.classList.add('drag-over');
        });

        element.addEventListener('dragleave', () => {
            element.classList.remove('drag-over');
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
            
            const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            if (index < 11) {
                this.data.lineup.starting[index] = playerData;
            } else {
                this.data.lineup.bench[index - 11] = playerData;
            }
            
            this.saveData();
            this.renderTactics();
            
            // Auto-select the position we just dropped to
            if (index < 11) {
                this.selectFieldPosition(index);
            } else {
                this.selectBenchPosition(index - 11);
            }
        });
    }

    renderPlanning() {
        if (!this.data) return;
        
        const container = document.getElementById('planning-seasons');
        const seasons = Object.keys(this.data.futurePlanning);
        const categories = [
            { key: 'toUse', label: 'To Use', class: 'to-use' },
            { key: 'sell', label: 'Sell', class: 'sell' },
            { key: 'loan', label: 'Loan', class: 'loan' },
            { key: 'dontKnow', label: "Don't Know Yet", class: 'dont-know' }
        ];

        container.innerHTML = '';

        seasons.forEach(season => {
            const seasonDiv = document.createElement('div');
            seasonDiv.className = 'planning-season';
            
            seasonDiv.innerHTML = `
                <div class="planning-season-header">
                    <div class="planning-season-title">Season ${season}</div>
                </div>
                
                <div class="planning-player-pool">
                    <h4>Available Players</h4>
                    <div class="planning-player-cards" id="pool-${season}">
                        ${this.data.players.map(player => `
                            <div class="player-card" draggable="true" 
                                 ondragstart="footballManager.handlePlanningDragStart(event, ${JSON.stringify(player).replace(/"/g, '&quot;')})">
                                <div class="player-card-name">${player.name}</div>
                                <div class="player-card-details">
                                    <div>Position: ${player.position}</div>
                                    <div>Age: ${player.age}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="planning-categories">
                    ${categories.map(category => `
                        <div class="planning-category ${category.class}" data-season="${season}" data-category="${category.key}">
                            <div class="planning-category-title">${category.label}</div>
                            <div class="planning-category-players" id="${season}-${category.key}"></div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.appendChild(seasonDiv);
        });

        // Add drop zones for planning categories
        document.querySelectorAll('.planning-category').forEach(category => {
            this.addPlanningDropZone(category);
        });

        // Render players in categories
        seasons.forEach(season => {
            categories.forEach(category => {
                const categoryContainer = document.getElementById(`${season}-${category.key}`);
                const players = this.data.futurePlanning[season][category.key];
                
                categoryContainer.innerHTML = '';
                players.forEach(player => {
                    const playerCard = this.createPlanningPlayerCard(player, season, category.key);
                    categoryContainer.appendChild(playerCard);
                });
            });
        });
    }

    handlePlanningDragStart(event, player) {
        event.dataTransfer.setData('text/plain', JSON.stringify(player));
        event.target.classList.add('dragging');
    }

    createPlanningPlayerCard(player, season, category) {
        const card = document.createElement('div');
        card.className = 'planning-player-card';
        
        card.innerHTML = `
            <button class="remove-btn" onclick="footballManager.removeFromPlanning('${season}', '${category}', ${player.id})">&times;</button>
            <div class="player-card-name">${player.name}</div>
            <div class="player-card-details">
                <div>Position: ${player.position}</div>
                <div>Age: ${player.age}</div>
            </div>
        `;

        return card;
    }

    removeFromPlanning(season, category, playerId) {
        if (!this.data) return;
        
        this.data.futurePlanning[season][category] = this.data.futurePlanning[season][category].filter(p => p.id !== playerId);
        this.saveData();
        this.renderPlanning();
    }

    addPlanningDropZone(element) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.classList.add('drag-over');
        });

        element.addEventListener('dragleave', () => {
            element.classList.remove('drag-over');
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
            
            const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const season = element.dataset.season;
            const category = element.dataset.category;
            
            // Check if player is already in this category
            const exists = this.data.futurePlanning[season][category].find(p => p.id === playerData.id);
            if (!exists) {
                this.data.futurePlanning[season][category].push(playerData);
                this.saveData();
                this.renderPlanning();
            }
        });

        // Clean up dragging class
        element.addEventListener('drop', () => {
            document.querySelectorAll('.dragging').forEach(el => {
                el.classList.remove('dragging');
            });
        });
    }
}

// Initialize the app
const footballManager = new FootballManager();

// Make it globally available for onclick handlers
window.footballManager = footballManager;

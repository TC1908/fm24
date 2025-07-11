class FootballManager {
    constructor() {
        this.currentCareer = null;
        this.currentTab = 'overview';
        this.formations = this.getFormations();
        this.sortOrder = 'asc';
        this.sortBy = 'name';
        this.historySortOrder = 'asc';
        this.historySortBy = 'name';
        this.selectedFieldPosition = null;
        this.playerToRemove = null;
        
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
                { id: 1, name: "Marcus Johnson", position: "GK", age: 28, level: { min: 83, max: 87 }, potential: { min: 85, max: 89 }, salary: 75000, contractDuration: 3, transferWorth: { min: 2200000, max: 2800000 } },
                { id: 2, name: "David Silva", position: "CB", age: 26, level: { min: 80, max: 84 }, potential: { min: 86, max: 90 }, salary: 65000, contractDuration: 4, transferWorth: { min: 2800000, max: 3600000 } },
                { id: 3, name: "Oliver Thompson", position: "CB", age: 24, level: { min: 76, max: 80 }, potential: { min: 83, max: 87 }, salary: 45000, contractDuration: 5, transferWorth: { min: 1800000, max: 2400000 } },
                { id: 4, name: "Lucas Martinez", position: "LB", age: 22, level: { min: 74, max: 78 }, potential: { min: 81, max: 85 }, salary: 35000, contractDuration: 4, transferWorth: { min: 1500000, max: 2100000 } },
                { id: 5, name: "Ryan Anderson", position: "RB", age: 27, level: { min: 78, max: 82 }, potential: { min: 80, max: 84 }, salary: 50000, contractDuration: 2, transferWorth: { min: 1900000, max: 2500000 } },
                { id: 6, name: "James Wilson", position: "CDM", age: 29, level: { min: 84, max: 88 }, potential: { min: 85, max: 89 }, salary: 85000, contractDuration: 2, transferWorth: { min: 3500000, max: 4100000 } },
                { id: 7, name: "Alex Rodriguez", position: "CM", age: 25, level: { min: 81, max: 85 }, potential: { min: 87, max: 91 }, salary: 70000, contractDuration: 3, transferWorth: { min: 3800000, max: 4600000 } },
                { id: 8, name: "Michael Brown", position: "CAM", age: 23, level: { min: 77, max: 81 }, potential: { min: 85, max: 89 }, salary: 55000, contractDuration: 4, transferWorth: { min: 3200000, max: 3800000 } },
                { id: 9, name: "Noah Garcia", position: "LW", age: 21, level: { min: 73, max: 77 }, potential: { min: 86, max: 90 }, salary: 40000, contractDuration: 5, transferWorth: { min: 2500000, max: 3100000 } },
                { id: 10, name: "Ethan Davis", position: "RW", age: 26, level: { min: 79, max: 83 }, potential: { min: 82, max: 86 }, salary: 60000, contractDuration: 3, transferWorth: { min: 2700000, max: 3300000 } },
                { id: 11, name: "Sebastian Lee", position: "ST", age: 24, level: { min: 82, max: 86 }, potential: { min: 88, max: 92 }, salary: 90000, contractDuration: 4, transferWorth: { min: 4800000, max: 5600000 } },
                { id: 12, name: "Carlos Vega", position: "GK", age: 32, level: { min: 77, max: 81 }, potential: { min: 77, max: 81 }, salary: 40000, contractDuration: 1, transferWorth: { min: 600000, max: 1000000 } }
            ],
            scoutTargets: [
                { id: 1001, name: "João Silva", position: "LW", age: 20, level: { min: 73, max: 77 }, potential: { min: 86, max: 90 }, scoutRating: { min: 4, max: 5 }, transferInterest: "High", loanInterest: "Medium", nextSteps: "Make Approach", transferWorth: { min: 2500000, max: 3100000 } },
                { id: 1002, name: "Pierre Dubois", position: "CM", age: 23, level: { min: 78, max: 82 }, potential: { min: 84, max: 88 }, scoutRating: { min: 3.5, max: 4.5 }, transferInterest: "Medium", loanInterest: "Low", nextSteps: "Continue Monitoring", transferWorth: { min: 3200000, max: 3800000 } },
                { id: 1003, name: "Hans Mueller", position: "CB", age: 26, level: { min: 81, max: 85 }, potential: { min: 83, max: 87 }, scoutRating: { min: 3, max: 4 }, transferInterest: "Low", loanInterest: "Very Low", nextSteps: "On Hold", transferWorth: { min: 3900000, max: 4500000 } }
            ],
            playerHistory: [
                { id: 2001, name: "Roberto Carlos", position: "LB", age: 35, level: { min: 86, max: 90 }, potential: { min: 86, max: 90 }, year: "2023", club: "Real Madrid", transferWorth: { min: 14000000, max: 16000000 } },
                { id: 2002, name: "Andrea Pirlo", position: "CM", age: 40, level: { min: 90, max: 94 }, potential: { min: 90, max: 94 }, year: "2022", club: "Juventus", transferWorth: { min: 23000000, max: 27000000 } }
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
            this.renderHistory();
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

    // RANGE VALUE UTILITIES
    formatRangeValue(range, type = 'number') {
        if (typeof range === 'object' && range.min !== undefined && range.max !== undefined) {
            if (range.min === range.max) {
                if (type === 'currency') {
                    return this.formatCurrency(range.min);
                } else if (type === 'stars') {
                    return this.convertToStars(range.min);
                }
                return range.min.toString();
            } else {
                if (type === 'currency') {
                    return `${this.formatCurrency(range.min)} - ${this.formatCurrency(range.max)}`;
                } else if (type === 'stars') {
                    return `${this.convertToStars(range.min)} - ${this.convertToStars(range.max)}`;
                }
                return `${range.min} - ${range.max}`;
            }
        }
        // Fallback for old single values
        if (type === 'currency') {
            return this.formatCurrency(range);
        } else if (type === 'stars') {
            return this.convertToStars(range);
        }
        return range.toString();
    }

    formatCurrency(value) {
        if (value >= 1000000) {
            return `€${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `€${(value / 1000).toFixed(0)}K`;
        }
        return `€${value.toLocaleString()}`;
    }

    getRangeFromInputs(minId, maxId) {
        const min = parseFloat(document.getElementById(minId).value) || 0;
        const max = parseFloat(document.getElementById(maxId).value) || min;
        
        if (min === max) {
            return min;
        }
        return { min: Math.min(min, max), max: Math.max(min, max) };
    }

    setRangeInputs(range, minId, maxId) {
        if (typeof range === 'object' && range.min !== undefined && range.max !== undefined) {
            document.getElementById(minId).value = range.min;
            document.getElementById(maxId).value = range.max;
        } else {
            document.getElementById(minId).value = range;
            document.getElementById(maxId).value = range;
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

        // History controls
        document.getElementById('history-search-input').addEventListener('input', () => this.renderHistory());
        document.getElementById('history-position-filter').addEventListener('change', () => this.renderHistory());
        document.getElementById('history-year-filter').addEventListener('change', () => this.renderHistory());
        document.getElementById('history-sort-select').addEventListener('change', (e) => {
            this.historySortBy = e.target.value;
            this.renderHistory();
        });
        document.getElementById('history-sort-order').addEventListener('click', () => {
            this.historySortOrder = this.historySortOrder === 'asc' ? 'desc' : 'asc';
            document.getElementById('history-sort-order').textContent = this.historySortOrder === 'asc' ? '↑' : '↓';
            this.renderHistory();
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

        document.getElementById('add-history-player-btn').addEventListener('click', () => {
            document.getElementById('add-history-modal').classList.add('show');
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

        document.getElementById('add-history-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHistoryPlayer();
        });

        document.getElementById('add-scout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addScoutTarget();
        });

        document.getElementById('add-future-player-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFuturePlayer();
        });

        // Remove player modal
        document.getElementById('move-to-history-btn').addEventListener('click', () => {
            this.movePlayerToHistory();
        });

        document.getElementById('delete-permanently-btn').addEventListener('click', () => {
            this.deletePlayerPermanently();
        });

        document.getElementById('cancel-remove-btn').addEventListener('click', () => {
            document.getElementById('remove-player-modal').classList.remove('show');
        });

        // Cancel buttons
        document.getElementById('cancel-add').addEventListener('click', () => {
            document.getElementById('add-player-modal').classList.remove('show');
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            document.getElementById('edit-player-modal').classList.remove('show');
        });

        document.getElementById('cancel-history').addEventListener('click', () => {
            document.getElementById('add-history-modal').classList.remove('show');
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
        } else if (tabName === 'history') {
            this.renderHistory();
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
        const historyPositions = [...new Set(this.data.playerHistory.map(p => p.position))].sort();
        const allPositions = [...new Set([...positions, ...scoutPositions, ...historyPositions])].sort();
        
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

        // Update history position filter
        const historySelect = document.getElementById('history-position-filter');
        const currentHistoryValue = historySelect.value;
        historySelect.innerHTML = '<option value="">All positions</option>';
        historyPositions.forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            historySelect.appendChild(option);
        });
        historySelect.value = currentHistoryValue;

        // Update year filter for history
        const years = [...new Set(this.data.playerHistory.map(p => p.year))].sort().reverse();
        const yearSelect = document.getElementById('history-year-filter');
        const currentYearValue = yearSelect.value;
        yearSelect.innerHTML = '<option value="">All years</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
        yearSelect.value = currentYearValue;
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

    getFilteredHistoryPlayers() {
        if (!this.data) return [];
        
        const searchTerm = document.getElementById('history-search-input').value.toLowerCase();
        const positionFilter = document.getElementById('history-position-filter').value;
        const yearFilter = document.getElementById('history-year-filter').value;

        let filtered = this.data.playerHistory.filter(player => {
            const matchesSearch = player.name.toLowerCase().includes(searchTerm) || 
                                  player.club.toLowerCase().includes(searchTerm);
            const matchesPosition = !positionFilter || player.position === positionFilter;
            const matchesYear = !yearFilter || player.year === yearFilter;
            return matchesSearch && matchesPosition && matchesYear;
        });

        return this.sortHistoryPlayers(filtered);
    }

    getFilteredScoutTargets() {
        if (!this.data) return [];
        
        const searchTerm = document.getElementById('scout-search-input').value.toLowerCase();
        const positionFilter = document.getElementById('scout-position-filter').value;
        const ratingFilter = document.getElementById('scout-rating-filter').value;

        let filtered = this.data.scoutTargets.filter(target => {
            const matchesSearch = target.name.toLowerCase().includes(searchTerm);
            const matchesPosition = !positionFilter || target.position === positionFilter;
            
            // Handle range scout rating
            let matchesRating = true;
            if (ratingFilter) {
                const minRating = parseFloat(ratingFilter);
                if (typeof target.scoutRating === 'object') {
                    matchesRating = target.scoutRating.max >= minRating;
                } else {
                    matchesRating = target.scoutRating >= minRating;
                }
            }
            return matchesSearch && matchesPosition && matchesRating;
        });

        return this.sortPlayers(filtered);
    }

    sortPlayers(players) {
        return players.sort((a, b) => {
            let aVal = a[this.sortBy];
            let bVal = b[this.sortBy];
            
            // Handle range values for sorting
            if (typeof aVal === 'object' && aVal.min !== undefined) {
                aVal = (aVal.min + aVal.max) / 2; // Use average for sorting
            }
            if (typeof bVal === 'object' && bVal.min !== undefined) {
                bVal = (bVal.min + bVal.max) / 2;
            }
            
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

    sortHistoryPlayers(players) {
        return players.sort((a, b) => {
            let aVal = a[this.historySortBy];
            let bVal = b[this.historySortBy];
            
            // Handle range values for sorting
            if (typeof aVal === 'object' && aVal.min !== undefined) {
                aVal = (aVal.min + aVal.max) / 2;
            }
            if (typeof bVal === 'object' && bVal.min !== undefined) {
                bVal = (bVal.min + bVal.max) / 2;
            }
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (this.historySortOrder === 'asc') {
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
                <td>${this.formatRangeValue(player.level, 'stars')}</td>
                <td>${this.formatRangeValue(player.potential, 'stars')}</td>
                <td>€${player.salary.toLocaleString()}</td>
                <td>${player.contractDuration}y</td>
                <td>${this.formatRangeValue(player.transferWorth, 'currency')}</td>
                <td>
                    <button class="action-btn edit" onclick="footballManager.showPlayerDetail(${player.id})">View</button>
                    <button class="action-btn edit" onclick="footballManager.showEditPlayer(${player.id})">Edit</button>
                    <button class="action-btn delete" onclick="footballManager.showRemovePlayer(${player.id})">Remove</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    renderHistory() {
        if (!this.data) return;
        
        const tbody = document.getElementById('history-tbody');
        const players = this.getFilteredHistoryPlayers();

        tbody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${player.name}</strong></td>
                <td>${player.position}</td>
                <td>${player.year}</td>
                <td><strong>${player.club}</strong></td>
                <td>${player.age}</td>
                <td>${this.formatRangeValue(player.level, 'stars')}</td>
                <td>${this.formatRangeValue(player.potential, 'stars')}</td>
                <td>${this.formatRangeValue(player.transferWorth, 'currency')}</td>
                <td>
                    <button class="action-btn edit" onclick="footballManager.editHistoryPlayer(${player.id})">Edit</button>
                    <button class="action-btn delete" onclick="footballManager.deleteHistoryPlayer(${player.id})">Delete</button>
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
                <td>${this.formatRangeValue(target.level, 'stars')}</td>
                <td>${this.formatRangeValue(target.potential, 'stars')}</td>
                <td>${this.formatRangeValue(target.scoutRating, 'stars')}</td>
                <td class="${interestClass}">${target.transferInterest}</td>
                <td class="${loanInterestClass}">${target.loanInterest}</td>
                <td class="${stepsClass}">${target.nextSteps}</td>
                <td>${this.formatRangeValue(target.transferWorth, 'currency')}</td>
                <td>
                    <button class="action-btn edit" onclick="footballManager.editScoutTarget(${target.id})">Edit</button>
                    <button class="action-btn delete" onclick="footballManager.deleteScoutTarget(${target.id})">Remove</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    showRemovePlayer(playerId) {
        if (!this.data) return;
        
        const player = this.data.players.find(p => p.id === playerId);
        if (!player) return;

        this.playerToRemove = player;
        document.getElementById('remove-player-name').textContent = player.name;
        document.getElementById('remove-player-modal').classList.add('show');
    }

    movePlayerToHistory() {
        if (!this.playerToRemove) return;

        const currentYear = new Date().getFullYear().toString();
        const historyPlayer = {
            ...this.playerToRemove,
            id: Math.max(0, ...this.data.playerHistory.map(p => p.id)) + 1,
            year: currentYear,
            club: "Free Agent" // Default club, can be edited later
        };

        // Add to history
        this.data.playerHistory.push(historyPlayer);

        // Remove from current squad and lineup
        this.data.players = this.data.players.filter(p => p.id !== this.playerToRemove.id);
        this.data.lineup.starting = this.data.lineup.starting.map(p => p && p.id === this.playerToRemove.id ? null : p);
        this.data.lineup.bench = this.data.lineup.bench.map(p => p && p.id === this.playerToRemove.id ? null : p);

        this.saveData();
        this.renderOverview();
        this.renderHistory();
        this.renderTactics();
        this.updatePositionFilters();

        this.playerToRemove = null;
        document.getElementById('remove-player-modal').classList.remove('show');
    }

    deletePlayerPermanently() {
        if (!this.playerToRemove) return;

        // Remove from current squad and lineup
        this.data.players = this.data.players.filter(p => p.id !== this.playerToRemove.id);
        this.data.lineup.starting = this.data.lineup.starting.map(p => p && p.id === this.playerToRemove.id ? null : p);
        this.data.lineup.bench = this.data.lineup.bench.map(p => p && p.id === this.playerToRemove.id ? null : p);

        this.saveData();
        this.renderOverview();
        this.renderTactics();
        this.updatePositionFilters();

        this.playerToRemove = null;
        document.getElementById('remove-player-modal').classList.remove('show');
    }

    addHistoryPlayer() {
        if (!this.data) return;
        
        const formElement = document.getElementById('add-history-form');
        const isEditing = formElement.dataset.editId;
        
        if (isEditing) {
            // Edit existing history player
            const playerId = parseInt(formElement.dataset.editId);
            const playerIndex = this.data.playerHistory.findIndex(p => p.id === playerId);
            
            if (playerIndex !== -1) {
                this.data.playerHistory[playerIndex] = {
                    ...this.data.playerHistory[playerIndex],
                    name: document.getElementById('history-player-name').value,
                    position: document.getElementById('history-player-position').value,
                    age: parseInt(document.getElementById('history-player-age').value),
                    level: this.getRangeFromInputs('history-player-level-min', 'history-player-level-max'),
                    potential: this.getRangeFromInputs('history-player-potential-min', 'history-player-potential-max'),
                    year: document.getElementById('history-player-year').value,
                    club: document.getElementById('history-player-club').value,
                    transferWorth: this.getRangeFromInputs('history-player-transfer-min', 'history-player-transfer-max')
                };
            }
            
            delete formElement.dataset.editId;
            document.querySelector('#add-history-modal h3').textContent = 'Add Former Player';
            document.querySelector('#add-history-form button[type="submit"]').textContent = 'Add to History';
        } else {
            // Add new history player
            const newPlayer = {
                id: Math.max(0, ...this.data.playerHistory.map(p => p.id)) + 1,
                name: document.getElementById('history-player-name').value,
                position: document.getElementById('history-player-position').value,
                age: parseInt(document.getElementById('history-player-age').value),
                level: this.getRangeFromInputs('history-player-level-min', 'history-player-level-max'),
                potential: this.getRangeFromInputs('history-player-potential-min', 'history-player-potential-max'),
                year: document.getElementById('history-player-year').value,
                club: document.getElementById('history-player-club').value,
                transferWorth: this.getRangeFromInputs('history-player-transfer-min', 'history-player-transfer-max')
            };

            this.data.playerHistory.push(newPlayer);
        }

        this.saveData();
        this.renderHistory();
        this.updatePositionFilters();

        document.getElementById('add-history-modal').classList.remove('show');
        document.getElementById('add-history-form').reset();
        this.resetAddHistoryForm();
    }

    editHistoryPlayer(playerId) {
        if (!this.data) return;
        
        const player = this.data.playerHistory.find(p => p.id === playerId);
        if (!player) return;

        // Use the same form as add history, but populate with existing data
        document.getElementById('history-player-name').value = player.name;
        document.getElementById('history-player-position').value = player.position;
        document.getElementById('history-player-age').value = player.age;
        this.setRangeInputs(player.level, 'history-player-level-min', 'history-player-level-max');
        this.setRangeInputs(player.potential, 'history-player-potential-min', 'history-player-potential-max');
        document.getElementById('history-player-year').value = player.year;
        document.getElementById('history-player-club').value = player.club;
        this.setRangeInputs(player.transferWorth, 'history-player-transfer-min', 'history-player-transfer-max');

        // Store the ID for editing
        document.getElementById('add-history-form').dataset.editId = playerId;
        document.querySelector('#add-history-modal h3').textContent = 'Edit Former Player';
        document.querySelector('#add-history-form button[type="submit"]').textContent = 'Save Changes';

        document.getElementById('add-history-modal').classList.add('show');
    }

    deleteHistoryPlayer(playerId) {
        if (!this.data) return;
        
        if (confirm('Are you sure you want to remove this player from history?')) {
            this.data.playerHistory = this.data.playerHistory.filter(p => p.id !== playerId);
            this.saveData();
            this.renderHistory();
            this.updatePositionFilters();
        }
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

    // NEW PLAYER DETAIL RENDERING
    showPlayerDetail(playerId) {
        if (!this.data) return;
        
        const player = this.data.players.find(p => p.id === playerId);
        if (!player) return;

        // Update basic info
        document.getElementById('player-profile-name').textContent = player.name;
        document.getElementById('player-profile-position').textContent = player.position;
        document.getElementById('player-profile-age').textContent = `${player.age} years old`;
        
        // Update summary stats
        document.getElementById('player-profile-current').innerHTML = this.formatRangeValue(player.level, 'stars');
        document.getElementById('player-profile-potential').innerHTML = this.formatRangeValue(player.potential, 'stars');
        document.getElementById('player-profile-value').textContent = this.formatRangeValue(player.transferWorth, 'currency');
        
        // Update contract info
        document.getElementById('player-profile-wage').textContent = `€${player.salary.toLocaleString()}`;
        document.getElementById('player-profile-contract').textContent = `${player.contractDuration} years`;
        
        // Determine squad status
        const isInStarting = this.data.lineup.starting.some(p => p && p.id === player.id);
        const isOnBench = this.data.lineup.bench.some(p => p && p.id === player.id);
        let status = 'Available for selection';
        if (isInStarting) status = 'Starting XI';
        else if (isOnBench) status = 'On bench';
        
        document.getElementById('player-profile-status').textContent = status;
        
        // Update stats bars
        this.updatePlayerStatBars(player);
        
        // Update position chart
        this.updatePositionChart(player);
        
        document.getElementById('edit-player-btn').dataset.playerId = player.id;

        this.switchTab('player-detail');
    }

    updatePlayerStatBars(player) {
        // Generate random stats based on player level
        const avgLevel = typeof player.level === 'object' ? (player.level.min + player.level.max) / 2 : player.level;
        const variance = 6; // How much stats can vary from average
        
        // Generate stats with some randomness but based on player level
        const stats = {
            // Technical
            corners: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            crossing: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            dribbling: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            finishing: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            firstTouch: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            freeKick: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            heading: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            longShots: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            
            // Mental
            aggression: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            anticipation: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            bravery: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            composure: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            concentration: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            decisions: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            determination: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            flair: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            
            // Physical
            acceleration: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            agility: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            balance: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            jumpingReach: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            naturalFitness: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            pace: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            stamina: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2))),
            strength: Math.max(1, Math.min(20, Math.floor(avgLevel * 0.2 + Math.random() * variance - variance/2)))
        };

        // Update all stat bars
        document.querySelectorAll('.stat-row').forEach((row, index) => {
            const statBar = row.querySelector('.stat-bar');
            const statFill = row.querySelector('.stat-fill');
            const statNumber = row.querySelector('.stat-number');
            
            const statNames = Object.keys(stats);
            if (index < statNames.length) {
                const statValue = stats[statNames[index]];
                const percentage = (statValue / 20) * 100;
                
                statBar.dataset.value = statValue;
                statFill.style.width = `${percentage}%`;
                statNumber.textContent = statValue;
                
                // Color coding based on value
                if (statValue >= 16) {
                    statFill.style.backgroundColor = '#39998E'; // Excellent
                } else if (statValue >= 12) {
                    statFill.style.backgroundColor = '#FFDC6C'; // Good
                } else if (statValue >= 8) {
                    statFill.style.backgroundColor = '#FFAA67'; // Average
                } else {
                    statFill.style.backgroundColor = '#DA674A'; // Poor
                }
            }
        });
    }

    updatePositionChart(player) {
        // Color code position slots based on player's position
        document.querySelectorAll('.position-slot').forEach(slot => {
            const slotPosition = slot.dataset.position;
            slot.className = 'position-slot';
            
            if (slotPosition === player.position) {
                slot.classList.add('excellent');
            } else if (this.isCompatiblePosition(player.position, slotPosition)) {
                slot.classList.add('good');
            } else if (this.isSimilarPosition(player.position, slotPosition)) {
                slot.classList.add('average');
            }
        });
    }

    isCompatiblePosition(playerPos, slotPos) {
        const compatible = {
            'LB': ['LM'],
            'RB': ['RM'],
            'CB': ['CDM'],
            'CDM': ['CM', 'CB'],
            'CM': ['CDM', 'CAM'],
            'CAM': ['CM', 'LW', 'RW'],
            'LW': ['LM', 'CAM'],
            'RW': ['RM', 'CAM'],
            'LM': ['LB', 'LW'],
            'RM': ['RB', 'RW']
        };
        
        return compatible[playerPos]?.includes(slotPos) || false;
    }

    isSimilarPosition(playerPos, slotPos) {
        const similar = {
            'CB': ['LB', 'RB'],
            'LB': ['CB', 'RB'],
            'RB': ['CB', 'LB'],
            'CDM': ['LB', 'RB'],
            'CM': ['LM', 'RM'],
            'LM': ['CM', 'CAM'],
            'RM': ['CM', 'CAM'],
            'LW': ['ST'],
            'RW': ['ST'],
            'ST': ['LW', 'RW', 'CAM']
        };
        
        return similar[playerPos]?.includes(slotPos) || false;
    }

    showEditPlayer(playerId) {
        if (!this.data) return;
        
        const player = this.data.players.find(p => p.id === playerId);
        if (!player) return;

        document.getElementById('edit-player-id').value = player.id;
        document.getElementById('edit-player-name').value = player.name;
        document.getElementById('edit-player-position').value = player.position;
        document.getElementById('edit-player-age').value = player.age;
        this.setRangeInputs(player.level, 'edit-player-level-min', 'edit-player-level-max');
        this.setRangeInputs(player.potential, 'edit-player-potential-min', 'edit-player-potential-max');
        document.getElementById('edit-player-salary').value = player.salary;
        document.getElementById('edit-player-contract').value = player.contractDuration;
        this.setRangeInputs(player.transferWorth, 'edit-player-transfer-min', 'edit-player-transfer-max');

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
            level: this.getRangeFromInputs('edit-player-level-min', 'edit-player-level-max'),
            potential: this.getRangeFromInputs('edit-player-potential-min', 'edit-player-potential-max'),
            salary: parseInt(document.getElementById('edit-player-salary').value),
            contractDuration: parseInt(document.getElementById('edit-player-contract').value),
            transferWorth: this.getRangeFromInputs('edit-player-transfer-min', 'edit-player-transfer-max')
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
            id: Math.max(0, ...this.data.players.map(p => p.id)) + 1,
            name: document.getElementById('player-name').value,
            position: document.getElementById('player-position').value,
            age: parseInt(document.getElementById('player-age').value),
            level: this.getRangeFromInputs('player-level-min', 'player-level-max'),
            potential: this.getRangeFromInputs('player-potential-min', 'player-potential-max'),
            salary: parseInt(document.getElementById('player-salary').value),
            contractDuration: parseInt(document.getElementById('player-contract').value),
            transferWorth: this.getRangeFromInputs('player-transfer-min', 'player-transfer-max')
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
        
        const formElement = document.getElementById('add-scout-form');
        const isEditing = formElement.dataset.editId;
        
        if (isEditing) {
            // Edit existing target
            const targetId = parseInt(formElement.dataset.editId);
            const targetIndex = this.data.scoutTargets.findIndex(t => t.id === targetId);
            
            if (targetIndex !== -1) {
                this.data.scoutTargets[targetIndex] = {
                    ...this.data.scoutTargets[targetIndex],
                    name: document.getElementById('scout-name').value,
                    position: document.getElementById('scout-position').value,
                    age: parseInt(document.getElementById('scout-age').value),
                    level: this.getRangeFromInputs('scout-level-min', 'scout-level-max'),
                    potential: this.getRangeFromInputs('scout-potential-min', 'scout-potential-max'),
                    scoutRating: this.getRangeFromInputs('scout-rating-min', 'scout-rating-max'),
                    transferInterest: document.getElementById('scout-transfer-interest').value,
                    loanInterest: document.getElementById('scout-loan-interest').value,
                    nextSteps: document.getElementById('scout-next-steps').value,
                    transferWorth: this.getRangeFromInputs('scout-transfer-min', 'scout-transfer-max')
                };
            }
            
            delete formElement.dataset.editId;
            document.querySelector('#add-scout-modal h3').textContent = 'Add Scout Target';
            document.querySelector('#add-scout-form button[type="submit"]').textContent = 'Add Target';
        } else {
            // Add new target
            const newTarget = {
                id: Math.max(0, ...this.data.scoutTargets.map(p => p.id)) + 1,
                name: document.getElementById('scout-name').value,
                position: document.getElementById('scout-position').value,
                age: parseInt(document.getElementById('scout-age').value),
                level: this.getRangeFromInputs('scout-level-min', 'scout-level-max'),
                potential: this.getRangeFromInputs('scout-potential-min', 'scout-potential-max'),
                scoutRating: this.getRangeFromInputs('scout-rating-min', 'scout-rating-max'),
                transferInterest: document.getElementById('scout-transfer-interest').value,
                loanInterest: document.getElementById('scout-loan-interest').value,
                nextSteps: document.getElementById('scout-next-steps').value,
                transferWorth: this.getRangeFromInputs('scout-transfer-min', 'scout-transfer-max')
            };

            this.data.scoutTargets.push(newTarget);
        }

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
            id: Math.max(0, ...this.data.players.map(p => p.id)) + 1,
            name: document.getElementById('future-player-name').value,
            position: document.getElementById('future-player-position').value,
            age: parseInt(document.getElementById('future-player-age').value),
            level: this.getRangeFromInputs('future-player-level-min', 'future-player-level-max'),
            potential: this.getRangeFromInputs('future-player-potential-min', 'future-player-potential-max'),
            salary: parseInt(document.getElementById('future-player-salary').value),
            contractDuration: parseInt(document.getElementById('future-player-contract').value),
            transferWorth: this.getRangeFromInputs('future-player-transfer-min', 'future-player-transfer-max')
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
        this.setRangeInputs(70, 'player-level-min', 'player-level-max');
        document.getElementById('player-level-max').value = 75;
        this.setRangeInputs(75, 'player-potential-min', 'player-potential-max');
        document.getElementById('player-potential-max').value = 80;
        document.getElementById('player-salary').value = 30000;
        document.getElementById('player-contract').value = 3;
        this.setRangeInputs(800000, 'player-transfer-min', 'player-transfer-max');
        document.getElementById('player-transfer-max').value = 1200000;
    }

    resetAddHistoryForm() {
        document.getElementById('history-player-age').value = 25;
        this.setRangeInputs(70, 'history-player-level-min', 'history-player-level-max');
        document.getElementById('history-player-level-max').value = 75;
        this.setRangeInputs(75, 'history-player-potential-min', 'history-player-potential-max');
        document.getElementById('history-player-potential-max').value = 80;
        this.setRangeInputs(800000, 'history-player-transfer-min', 'history-player-transfer-max');
        document.getElementById('history-player-transfer-max').value = 1200000;
    }

    resetAddScoutForm() {
        document.getElementById('scout-age').value = 22;
        this.setRangeInputs(70, 'scout-level-min', 'scout-level-max');
        document.getElementById('scout-level-max').value = 75;
        this.setRangeInputs(75, 'scout-potential-min', 'scout-potential-max');
        document.getElementById('scout-potential-max').value = 80;
        this.setRangeInputs(3, 'scout-rating-min', 'scout-rating-max');
        document.getElementById('scout-rating-max').value = 3.5;
        this.setRangeInputs(800000, 'scout-transfer-min', 'scout-transfer-max');
        document.getElementById('scout-transfer-max').value = 1200000;
    }

    resetAddFuturePlayerForm() {
        document.getElementById('future-player-age').value = 18;
        this.setRangeInputs(60, 'future-player-level-min', 'future-player-level-max');
        document.getElementById('future-player-level-max').value = 65;
        this.setRangeInputs(80, 'future-player-potential-min', 'future-player-potential-max');
        document.getElementById('future-player-potential-max').value = 85;
        document.getElementById('future-player-salary').value = 20000;
        document.getElementById('future-player-contract').value = 5;
        this.setRangeInputs(400000, 'future-player-transfer-min', 'future-player-transfer-max');
        document.getElementById('future-player-transfer-max').value = 600000;
    }

    editScoutTarget(targetId) {
        if (!this.data) return;
        
        const target = this.data.scoutTargets.find(t => t.id === targetId);
        if (!target) return;

        // Use the same form as add scout, but populate with existing data
        document.getElementById('scout-name').value = target.name;
        document.getElementById('scout-position').value = target.position;
        document.getElementById('scout-age').value = target.age;
        this.setRangeInputs(target.level, 'scout-level-min', 'scout-level-max');
        this.setRangeInputs(target.potential, 'scout-potential-min', 'scout-potential-max');
        this.setRangeInputs(target.scoutRating, 'scout-rating-min', 'scout-rating-max');
        document.getElementById('scout-transfer-interest').value = target.transferInterest;
        document.getElementById('scout-loan-interest').value = target.loanInterest;
        document.getElementById('scout-next-steps').value = target.nextSteps;
        this.setRangeInputs(target.transferWorth, 'scout-transfer-min', 'scout-transfer-max');

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
                        <span class="player-info-value">${this.formatRangeValue(player.level, 'stars')}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Potential</span>
                        <span class="player-info-value">${this.formatRangeValue(player.potential, 'stars')}</span>
                    </div>
                    <div class="player-info-item">
                        <span class="player-info-label">Transfer Value</span>
                        <span class="player-info-value">${this.formatRangeValue(player.transferWorth, 'currency')}</span>
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
                <div>Level: ${this.formatRangeValue(player.level, 'stars')}</div>
                <div>Potential: ${this.formatRangeValue(player.potential, 'stars')}</div>
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

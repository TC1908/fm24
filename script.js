class FootballManager {
    constructor() {
        this.data = this.loadData();
        this.currentTab = 'overview';
        this.formations = this.getFormations();
        this.sortOrder = 'asc';
        this.sortBy = 'name';
        
        this.init();
    }

    getFormations() {
        return {
            '4231': [
                { x: 50, y: 85, position: 'GK' },
                { x: 20, y: 65, position: 'LB' }, { x: 36, y: 65, position: 'CB' }, 
                { x: 64, y: 65, position: 'CB' }, { x: 80, y: 65, position: 'RB' },
                { x: 35, y: 45, position: 'CDM' }, { x: 65, y: 45, position: 'CDM' },
                { x: 20, y: 25, position: 'LW' }, { x: 50, y: 25, position: 'CAM' }, 
                { x: 80, y: 25, position: 'RW' },
                { x: 50, y: 5, position: 'ST' }
            ],
            '433': [
                { x: 50, y: 85, position: 'GK' },
                { x: 20, y: 65, position: 'LB' }, { x: 36, y: 65, position: 'CB' }, 
                { x: 64, y: 65, position: 'CB' }, { x: 80, y: 65, position: 'RB' },
                { x: 35, y: 40, position: 'CM' }, { x: 50, y: 40, position: 'CM' }, 
                { x: 65, y: 40, position: 'CM' },
                { x: 20, y: 15, position: 'LW' }, { x: 50, y: 15, position: 'ST' }, 
                { x: 80, y: 15, position: 'RW' }
            ],
            '343': [
                { x: 50, y: 85, position: 'GK' },
                { x: 30, y: 65, position: 'CB' }, { x: 50, y: 65, position: 'CB' }, 
                { x: 70, y: 65, position: 'CB' },
                { x: 15, y: 40, position: 'LM' }, { x: 38, y: 40, position: 'CM' }, 
                { x: 62, y: 40, position: 'CM' }, { x: 85, y: 40, position: 'RM' },
                { x: 30, y: 15, position: 'ST' }, { x: 50, y: 15, position: 'ST' }, 
                { x: 70, y: 15, position: 'ST' }
            ],
            '523': [
                { x: 50, y: 85, position: 'GK' },
                { x: 15, y: 65, position: 'LB' }, { x: 30, y: 65, position: 'CB' }, 
                { x: 50, y: 65, position: 'CB' }, { x: 70, y: 65, position: 'CB' }, 
                { x: 85, y: 65, position: 'RB' },
                { x: 35, y: 40, position: 'CM' }, { x: 50, y: 40, position: 'CM' }, 
                { x: 65, y: 40, position: 'CM' },
                { x: 35, y: 15, position: 'ST' }, { x: 65, y: 15, position: 'ST' }
            ],
            '442': [
                { x: 50, y: 85, position: 'GK' },
                { x: 20, y: 65, position: 'LB' }, { x: 36, y: 65, position: 'CB' }, 
                { x: 64, y: 65, position: 'CB' }, { x: 80, y: 65, position: 'RB' },
                { x: 20, y: 35, position: 'LM' }, { x: 40, y: 35, position: 'CM' }, 
                { x: 60, y: 35, position: 'CM' }, { x: 80, y: 35, position: 'RM' },
                { x: 40, y: 15, position: 'ST' }, { x: 60, y: 15, position: 'ST' }
            ],
            '41212': [
                { x: 50, y: 85, position: 'GK' },
                { x: 20, y: 65, position: 'LB' }, { x: 36, y: 65, position: 'CB' }, 
                { x: 64, y: 65, position: 'CB' }, { x: 80, y: 65, position: 'RB' },
                { x: 50, y: 50, position: 'CDM' },
                { x: 35, y: 30, position: 'CM' }, { x: 65, y: 30, position: 'CM' },
                { x: 50, y: 20, position: 'CAM' },
                { x: 38, y: 8, position: 'ST' }, { x: 62, y: 8, position: 'ST' }
            ],
            '424': [
                { x: 50, y: 85, position: 'GK' },
                { x: 20, y: 65, position: 'LB' }, { x: 36, y: 65, position: 'CB' }, 
                { x: 64, y: 65, position: 'CB' }, { x: 80, y: 65, position: 'RB' },
                { x: 40, y: 35, position: 'CM' }, { x: 60, y: 35, position: 'CM' },
                { x: 20, y: 15, position: 'LW' }, { x: 40, y: 15, position: 'ST' }, 
                { x: 60, y: 15, position: 'ST' }, { x: 80, y: 15, position: 'RW' }
            ]
        };
    }

    loadData() {
        const saved = localStorage.getItem('footballManagerData');
        if (saved) {
            return JSON.parse(saved);
        }
        
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

    saveData() {
        localStorage.setItem('footballManagerData', JSON.stringify(this.data));
    }

    init() {
        this.setupEventListeners();
        this.renderOverview();
        this.renderTactics();
        this.renderPlanning();
        this.updatePositionFilter();
    }

    setupEventListeners() {
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

        // Add player
        document.getElementById('add-player-btn').addEventListener('click', () => {
            document.getElementById('add-player-modal').classList.add('show');
        });

        document.getElementById('add-player-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPlayer();
        });

        document.getElementById('cancel-add').addEventListener('click', () => {
            document.getElementById('add-player-modal').classList.remove('show');
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
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });

        this.currentTab = tabName;

        // Re-render current tab if needed
        if (tabName === 'tactics') {
            this.renderTactics();
        } else if (tabName === 'planning') {
            this.renderPlanning();
        }
    }

    updatePositionFilter() {
        const positions = [...new Set(this.data.players.map(p => p.position))].sort();
        const select = document.getElementById('position-filter');
        const currentValue = select.value;
        
        select.innerHTML = '<option value="">All positions</option>';
        positions.forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            select.appendChild(option);
        });
        
        select.value = currentValue;
    }

    getFilteredPlayers() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const positionFilter = document.getElementById('position-filter').value;

        let filtered = this.data.players.filter(player => {
            const matchesSearch = player.name.toLowerCase().includes(searchTerm);
            const matchesPosition = !positionFilter || player.position === positionFilter;
            return matchesSearch && matchesPosition;
        });

        // Sort players
        filtered.sort((a, b) => {
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

        return filtered;
    }

    renderOverview() {
        const tbody = document.getElementById('players-tbody');
        const players = this.getFilteredPlayers();

        tbody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            row.addEventListener('click', () => this.showPlayerDetail(player));
            
            row.innerHTML = `
                <td><strong>${player.name}</strong></td>
                <td>${player.position}</td>
                <td>${player.age}</td>
                <td>${player.level}</td>
                <td>${player.potential}</td>
                <td>€${player.salary.toLocaleString()}</td>
                <td>${player.contractDuration}y</td>
                <td>€${player.transferWorth.toLocaleString()}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    addPlayer() {
        const form = document.getElementById('add-player-form');
        const formData = new FormData(form);
        
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
        this.updatePositionFilter();

        document.getElementById('add-player-modal').classList.remove('show');
        form.reset();
        document.getElementById('player-age').value = 20;
        document.getElementById('player-level').value = 70;
        document.getElementById('player-potential').value = 75;
        document.getElementById('player-salary').value = 30000;
        document.getElementById('player-contract').value = 3;
        document.getElementById('player-transfer').value = 1000000;
    }

    showPlayerDetail(player) {
        const modal = document.getElementById('player-detail-modal');
        const nameElement = document.getElementById('player-detail-name');
        const contentElement = document.getElementById('player-detail-content');

        nameElement.textContent = player.name;
        
        contentElement.innerHTML = `
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Position</div>
                    <div class="detail-value">${player.position}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Age</div>
                    <div class="detail-value">${player.age}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Current Level</div>
                    <div class="detail-value">${player.level}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Potential</div>
                    <div class="detail-value">${player.potential}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Weekly Salary</div>
                    <div class="detail-value salary">€${player.salary.toLocaleString()}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Contract Duration</div>
                    <div class="detail-value">${player.contractDuration} years</div>
                </div>
                <div class="detail-item" style="grid-column: 1/-1;">
                    <div class="detail-label">Transfer Worth</div>
                    <div class="detail-value transfer">€${player.transferWorth.toLocaleString()}</div>
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    changeFormation(formation) {
        this.data.formation = formation;
        this.data.lineup.starting = Array(11).fill(null);
        this.saveData();

        // Update formation buttons
        document.querySelectorAll('.formation-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.formation === formation);
        });

        this.renderTactics();
    }

    renderTactics() {
        this.renderFieldPositions();
        this.renderBenchPositions();
        this.renderAvailablePlayers();
    }

    renderFieldPositions() {
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
                positionElement.innerHTML = `<div style="text-align: center; font-size: 0.6rem; line-height: 1;">
                    ${assignedPlayer.name.split(' ')[0]}<br>
                    <span style="font-size: 0.5rem;">${assignedPlayer.position}</span>
                </div>`;
            } else {
                positionElement.textContent = pos.position;
            }

            this.addDropZone(positionElement, 'field', index);
            container.appendChild(positionElement);
        });
    }

    renderBenchPositions() {
        const container = document.getElementById('bench-positions');
        container.innerHTML = '';

        for (let i = 0; i < 7; i++) {
            const positionElement = document.createElement('div');
            positionElement.className = 'bench-position';
            positionElement.dataset.index = i + 11;
            
            const assignedPlayer = this.data.lineup.bench[i];
            if (assignedPlayer) {
                positionElement.classList.add('occupied');
                positionElement.textContent = assignedPlayer.name.split(' ')[0].slice(0, 3);
            } else {
                positionElement.textContent = i + 1;
            }

            this.addDropZone(positionElement, 'bench', i + 11);
            container.appendChild(positionElement);
        }
    }

    renderAvailablePlayers() {
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
                <div>Level: ${player.level}</div>
                <div>Potential: ${player.potential}</div>
            </div>
        `;

        if (!isDraggable) {
            card.addEventListener('click', () => this.showPlayerDetail(player));
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
        });
    }

    renderPlanning() {
        const container = document.getElementById('planning-seasons');
        const seasons = ['26/27', '27/28', '28/29'];
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
                <div class="planning-season-title">Season ${season}</div>
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

        this.renderPlanningPlayerPool();
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
    }

    renderPlanningPlayerPool() {
        const container = document.getElementById('planning-players');
        container.innerHTML = '';

        this.data.players.forEach(player => {
            const playerCard = this.createPlayerCard(player, true);
            container.appendChild(playerCard);
        });
    }
}

// Initialize the app
const footballManager = new FootballManager();

// Make it globally available for onclick handlers
window.footballManager = footballManager;

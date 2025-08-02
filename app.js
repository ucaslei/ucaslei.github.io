// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 全局变量
    let allBooks = books;
    let filteredBooks = [...books]; // 创建副本
    let currentPage = 1;
    let booksPerPage = 12;

    // 渲染图书列表
    function renderBooks() {
        const booksGrid = document.getElementById('booksGrid');
        const noResults = document.getElementById('noResults');
        const pagination = document.getElementById('pagination');
        
        if (filteredBooks.length === 0) {
            booksGrid.style.display = 'none';
            noResults.style.display = 'block';
            pagination.style.display = 'none';
            updateResultsInfo();
            return;
        }
        
        booksGrid.style.display = 'grid';
        noResults.style.display = 'none';
        pagination.style.display = 'flex';
        
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const booksToShow = filteredBooks.slice(startIndex, endIndex);
        
        booksGrid.innerHTML = booksToShow.map(book => `
            <div class="book-card" onclick="viewBook(${book.id})">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <div class="book-author">
                        <i data-lucide="user" width="16" height="16"></i>
                        ${book.author}
                    </div>
                    <span class="book-category">${book.category}</span>
                    <p class="book-description">${book.description}</p>
                    <div class="download-buttons">
                        ${book.downloads.map((download, index) => `
                            <button class="download-btn ${book.downloads.length > 1 ? 'multi-download' : ''}" 
                                    onclick="event.stopPropagation(); downloadBook('${download.url}', '${book.title}', '${download.name}')">
                                <i data-lucide="download" width="16" height="16"></i>
                                ${book.downloads.length === 1 ? '免费下载' : download.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // 重新渲染图标
        if (window.lucide) {
            lucide.createIcons();
        }
        
        renderPagination();
        updateResultsInfo();
    }

    // 渲染分页
    function renderPagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // 上一页按钮
        paginationHTML += `
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i data-lucide="chevron-left" width="16" height="16"></i>
                上一页
            </button>
        `;
        
        // 页码显示逻辑
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 7) {
                if (i === 1 || i === totalPages || 
                    (i >= currentPage - 2 && i <= currentPage + 2)) {
                    paginationHTML += `
                        <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    paginationHTML += `<span class="pagination-info">...</span>`;
                }
            } else {
                paginationHTML += `
                    <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            }
        }
        
        // 下一页按钮
        paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                下一页
                <i data-lucide="chevron-right" width="16" height="16"></i>
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
        
        // 重新渲染图标
        if (window.lucide) {
            setTimeout(() => {
                lucide.createIcons();
            }, 0);
        }
    }

// 更新结果信息
function updateResultsInfo() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `共 ${filteredBooks.length} 本图书`;
    }
}

// 切换页码
window.changePage = function(page) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderBooks();
    
    // 滚动到顶部
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
}

// 设置活跃类别按钮
function setActiveCategory(category) {
    // 移除所有按钮的活跃状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 设置指定类别的按钮为活跃状态
    const targetBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
}

// 显示自动关闭的提示框
function showAutoCloseAlert(message, duration = 2000) {
    // 创建自定义提示框
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 16px;
        transition: opacity 0.3s ease;
    `;
    alertBox.textContent = message;
    
    // 添加到页面
    document.body.appendChild(alertBox);
    
    // 自动移除
    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            if (alertBox.parentNode) {
                alertBox.parentNode.removeChild(alertBox);
            }
        }, 300);
    }, duration);
}

// 执行搜索 - 主要的搜索函数
window.performSearch = function() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    let activeCategory;
    let shouldShowAlert = false;
    let alertMessage = '';
    
    if (searchTerm === '') {
        // 无搜索内容时，使用当前激活的类别按钮
        activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    } else {
        // 有搜索内容时，先在当前类别中搜索
        activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        // 先在当前类别中搜索
        let categoryResults = allBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                                book.author.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        
        // 如果当前类别中没有结果，且不是在 'all' 类别中搜索
        if (categoryResults.length === 0 && activeCategory !== 'all') {
            // 在全局搜索
            activeCategory = 'all';
            setActiveCategory('all'); // 切换按钮到 all
            shouldShowAlert = true;
            
            // 重新在全局搜索
            categoryResults = allBooks.filter(book => {
                return book.title.toLowerCase().includes(searchTerm) ||
                       book.author.toLowerCase().includes(searchTerm);
            });
            
            if (categoryResults.length > 0) {
                alertMessage = `当前栏目无搜索结果，已在全局找到 ${categoryResults.length} 本关于"${searchTerm}"的图书。`;
            } else {
                alertMessage = `未找到关于"${searchTerm}"的任何图书。`;
            }
        } else if (categoryResults.length > 0) {
            // 在当前类别中找到了结果
            shouldShowAlert = true;
            const categoryName = activeCategory === 'all' ? '全部' : 
                               document.querySelector(`.filter-btn[data-category="${activeCategory}"]`)?.textContent || '当前栏目';
            alertMessage = `在${categoryName}中找到 ${categoryResults.length} 本关于"${searchTerm}"的图书。`;
        } else {
            // 即使在全局也没有找到结果
            shouldShowAlert = true;
            alertMessage = `未找到关于"${searchTerm}"的任何图书。`;
        }
        
        filteredBooks = categoryResults;
    }
    
    // 如果没有搜索词，正常按类别过滤
    if (searchTerm === '') {
        filteredBooks = allBooks.filter(book => {
            return activeCategory === 'all' || book.category === activeCategory;
        });
    }
    
    currentPage = 1;
    renderBooks();
    updateResultsInfo();
    
    // 显示提示信息
    if (shouldShowAlert && alertMessage) {
        showAutoCloseAlert(alertMessage);
    }
}

// 类别过滤功能（如果你有类别按钮的话）
window.filterByCategory = function(category) {
    // 清空搜索框
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // 设置活跃按钮
    setActiveCategory(category);
    
    // 过滤图书
    filteredBooks = allBooks.filter(book => {
        return category === 'all' || book.category === category;
    });
    
    currentPage = 1;
    renderBooks();
    updateResultsInfo();
}

    // 类别筛选函数
    function filterByCategory() {
        // 清空搜索框
        document.getElementById('searchInput').value = '';
        // 执行搜索
        performSearch();
    }

    // 更改每页显示数量
    function changePerPage() {
        const newPerPage = parseInt(document.getElementById('perPageSelect').value);
        if (newPerPage !== booksPerPage) {
            booksPerPage = newPerPage;
            currentPage = 1;
            renderBooks();
        }
    }

    // 查看图书详情
    window.viewBook = function(bookId) {
        const book = allBooks.find(b => b.id === bookId);
        if (book) {
            const downloadInfo = book.downloads.map(d => d.name).join('、');
            alert(`图书详情：\n\n标题：${book.title}\n作者：${book.author}\n分类：${book.category}\n可下载平台：${downloadInfo}\n\n简介：${book.description}`);
        }
    }

    // 下载图书
    window.downloadBook = function(url, title, platform = '') {
        if (url.startsWith('#')) {
            const platformText = platform ? ` (${platform})` : '';
            alert(`《${title}》${platformText}下载功能即将开放！\n\n请将 downloads 数组中的 url 字段设置为实际的文件下载地址。`);
            return;
        }
        
        // 实际下载逻辑
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 事件监听
    // 搜索框回车事件
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    document.getElementById('perPageSelect').addEventListener('change', changePerPage);
    
    // 类别筛选按钮事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterByCategory();
        });
    });

    // 初始化页面
    renderBooks();
    
    // 确保Lucide图标正确加载
    if (window.lucide) {
        lucide.createIcons();
    }
});
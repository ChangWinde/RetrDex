window.HELP_IMPROVE_VIDEOJS = false;

window.addEventListener('load', function() {
    console.log('Page fully loaded');
    console.log('pageConfig loaded:', pageConfig);
    console.log('citation enabled:', pageConfig.sections.citation.enabled);
    console.log('bibtex content:', pageConfig.sections.citation.bibtex);
    
    initializePage();
    
    // 初始化轮播
    initializeCarousel('#results-carousel');
});

// Initialize page
function initializePage() {
    // Handle header
    if (!pageConfig.sections.header.enabled) {
        document.querySelector('section.hero:first-of-type').style.display = 'none';
    } else {
        // Set title
        document.querySelector('.publication-title').textContent = pageConfig.sections.header.title;
        
        // Set authors
        const authorsContainer = document.querySelector('.publication-authors');
        authorsContainer.innerHTML = '';

        // Create first and second row
        const firstRow = document.createElement('div');
        firstRow.className = 'author-row';
        const secondRow = document.createElement('div');
        secondRow.className = 'author-row';

        let currentRow = firstRow;

        pageConfig.sections.header.authors.forEach(author => {
            const authorSpan = document.createElement('span');
            authorSpan.className = 'author-block';
            authorSpan.innerHTML = `
                <a href="${author.link}" target="_blank">${author.name}</a>
                ${author.isEqualContribution ? '<sup>*</sup>' : ''}
            `;
            
            currentRow.appendChild(authorSpan);
            
            if (author.lineBreak) {
                currentRow = secondRow;
            }
        });

        authorsContainer.appendChild(firstRow);
        authorsContainer.appendChild(secondRow);

        // Set institution and venue
        const venueContainer = document.querySelector('.publication-venue-authors');
        venueContainer.innerHTML = `
            <span class="institution-name">${pageConfig.sections.header.institution}</span>
            <span class="venue-name">${pageConfig.sections.header.venue}</span>
            ${pageConfig.sections.header.authors.some(a => a.isEqualContribution) ? 
              '<span class="eql-cntrb"><sup>*</sup>Equal Contribution</span>' : ''}
        `;

        // Set links
        const links = pageConfig.sections.header.links;
        if (links.paper.enabled) {
            document.querySelector('a[href*="arxiv.org/pdf"]').href = 
                `https://arxiv.org/pdf/${links.paper.arxivId}.pdf`;
            document.querySelector('a[href*="arxiv.org/abs"]').href = 
                `https://arxiv.org/abs/${links.paper.arxivId}`;
        }
        if (links.supplementary.enabled) {
            document.querySelector('a[href*="supplementary"]').href = links.supplementary.path;
        }
        if (links.github.enabled) {
            document.querySelector('.publication-links a[href*="github"]').href = links.github.repo;
        }
    }
    
    // Handle teaser video
    if (!pageConfig.sections.content.teaser.enabled) {
        document.querySelector('section.teaser').style.display = 'none';
    } else {
        const teaser = pageConfig.sections.content.teaser;
        if (teaser.video.enabled) {
            const video = document.querySelector('section.teaser video source');
            video.src = teaser.video.path;
            video.parentElement.load(); // Reload video with new source
        }
        if (teaser.subtitle.enabled) {
            document.querySelector('section.teaser .subtitle').textContent = teaser.subtitle.text;
        }
    }
    
    // Handle abstract
    if (!pageConfig.sections.content.abstract.enabled) {
        document.querySelector('section.hero.is-light').style.display = 'none';
    } else {
        document.querySelector('.content.has-text-justified p').textContent = 
            pageConfig.sections.content.abstract.text;
    }
    
    // Handle image carousel
    if (pageConfig.sections.content.imageCarousel.enabled) {
        const imageCarousel = document.querySelector('#results-carousel');
        imageCarousel.innerHTML = '';
        
        pageConfig.sections.content.imageCarousel.images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <div class="item-content">
                    <img src="static/images/${image.path}" alt="${image.alt}"/>
                </div>
                <div class="item-description">
                    ${image.caption}
                </div>
            `;
            imageCarousel.appendChild(item);
        });

        // Initialize image carousel after content is added
        initializeCarousel('#results-carousel');
    }
    
    // Handle video presentation
    if (!pageConfig.sections.content.videoPresentation.enabled) {
        document.querySelector('section.hero.is-small.is-light').style.display = 'none';
    } else {
        const presentation = pageConfig.sections.content.videoPresentation;
        document.querySelector('section.hero.is-small.is-light .title.is-3').textContent = 
            presentation.title;
        document.querySelector('.publication-video iframe').src = 
            `https://www.youtube.com/embed/${presentation.youtubeId}`;
    }
    
    // Handle video carousel
    if (pageConfig.sections.content.videoCarousel.enabled) {
        const videoSection = document.querySelector('.hero.is-small:last-of-type');
        const title = videoSection.querySelector('.title.is-3');
        title.textContent = pageConfig.sections.content.videoCarousel.title;
        
        const videoCarousel = videoSection.querySelector('#results-carousel');
        videoCarousel.innerHTML = '';
        
        pageConfig.sections.content.videoCarousel.videos.forEach(video => {
            const item = document.createElement('div');
            item.className = `item item-video${video.id}`;
            item.innerHTML = `
                <video poster="static/images/${video.poster}" id="video${video.id}" autoplay controls muted loop height="100%">
                    <source src="static/videos/${video.path}" type="video/mp4">
                </video>
            `;
            videoCarousel.appendChild(item);
        });

        // Initialize video carousel after content is added
        initializeCarousel('.hero.is-small:last-of-type #results-carousel');
    }
    
    // Handle poster
    if (!pageConfig.sections.content.poster.enabled) {
        const posterSections = document.querySelectorAll('section.hero.is-small.is-light');
        posterSections.forEach(section => {
            if (section.querySelector('.title') && 
                section.querySelector('.title').textContent.includes('Poster')) {
                section.remove();
            }
        });
    } else {
        const poster = pageConfig.sections.content.poster;
        const posterSections = document.querySelectorAll('section.hero.is-small.is-light');
        posterSections.forEach(section => {
            if (section.querySelector('.title') && 
                section.querySelector('.title').textContent.includes('Poster')) {
                section.querySelector('.title').textContent = poster.title;
                const iframe = section.querySelector('iframe');
                if (iframe) {
                    iframe.src = poster.pdfPath;
                }
            }
        });
    }
    
    // Handle citation
    if (!pageConfig.sections.citation.enabled) {
        console.log('Citation section is disabled');
        document.querySelector('section#BibTeX').style.display = 'none';
    } else {
        console.log('Citation section is enabled');
        const bibtexElement = document.querySelector('#bibtex-content');
        console.log('Bibtex element:', bibtexElement);
        if (bibtexElement) {
            console.log('Setting bibtex content:', pageConfig.sections.citation.bibtex);
            bibtexElement.innerHTML = pageConfig.sections.citation.bibtex.trim();
            console.log('Content set successfully');
        } else {
            console.error('Bibtex element not found');
        }
    }
    
    // Handle footer
    if (!pageConfig.sections.footer.enabled) {
        document.querySelector('footer.footer').style.display = 'none';
    }
}

// Add a new function to handle carousel initialization
function initializeCarousel(selector) {
    // Wait for DOM ready
    const carousel = bulmaCarousel.attach(selector, {
        slidesToShow: 1,
        slidesToScroll: 1,
        pagination: true,
        navigation: true,
        autoplay: false,
        effect: 'slide',
        loop: true,
        infinite: true
    })[0];

    if (carousel) {
        // Handle videos on slide change
        carousel.on('before:show', (item) => {
            const videos = document.querySelectorAll(`${selector} video`);
            videos.forEach(video => video.pause());
        });

        carousel.on('after:show', (item) => {
            const videos = item.querySelectorAll('video');
            videos.forEach(video => {
                video.play().catch(() => {
                    video.muted = true;
                    video.play();
                });
            });
        });

        // Start first slide videos
        const firstVideos = carousel.items[0].querySelectorAll('video');
        firstVideos.forEach(video => {
            video.play().catch(() => {
                video.muted = true;
                video.play();
            });
        });
    }
}

// Add copy function
function copyBibTeX() {
    // 获取纯文本内容，移除HTML标签
    const code = document.querySelector('#bibtex-content').textContent;
    const button = document.querySelector('.copy-button');
    
    // Save original button content
    const originalContent = button.innerHTML;
    
    // Show copying state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.style.background = 'rgba(255,255,255,0.2)';
    
    // Try to copy using the Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code)
            .then(() => {
                showSuccess();
            })
            .catch(() => {
                fallbackCopy();
            });
    } else {
        fallbackCopy();
    }
    
    function fallbackCopy() {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showSuccess();
        } catch (err) {
            console.error('Copy failed:', err);
            showError();
        }
    }
    
    function showSuccess() {
        button.innerHTML = '<i class="fas fa-check" style="color: #4086f4;"></i>';
        button.style.background = 'rgba(64, 134, 244, 0.2)';
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = 'rgba(255,255,255,0.1)';
        }, 1500);
    }
    
    function showError() {
        button.innerHTML = '<i class="fas fa-times"></i>';
        button.style.background = 'rgba(220, 53, 69, 0.2)';
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = 'rgba(255,255,255,0.1)';
        }, 1500);
    }
}

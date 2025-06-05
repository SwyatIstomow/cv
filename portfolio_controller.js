document.addEventListener('DOMContentLoaded', () => {
    

    
    const albums = [
        {
            name: "Figma",
            logo: "Icons/Figma_Logo.svg",
            backgroundColor: "#303030",
            accentColor: "#A259FF",
            imageSource: "Figma_Album/Preview",
            imageCount: 22,
            videoCount: 1,
            images: ["path/to/image1.jpg", "path/to/image2.jpg"],
            videos: [],
            description: ['Design', 'Ad', 'Web'],
            type: 'img',
        },
        {
            name: "Adobe Illustrator",
            logo: "Icons/Ai_Logo.svg",
            backgroundColor: "#330000",
            accentColor: "#FF9A00",
            imageSource: "Ai_Album/Preview",
            imageCount: 45,
            videoCount: 1,
            images: ["path/to/image3.jpg", "path/to/image4.jpg"],
            videos: [],
            description: ['Vector', 'Logo', 'Ad'],
            type: 'img',
        },

        {
            name: "Adobe Photoshop",
            logo: "Icons/Ps_Logo.svg",
            backgroundColor: "#001E36",
            accentColor: "#31A8FF",
            imageSource: "Ps_Album/Preview",
            imageCount: 35,
            videoCount: 1,
            images: ["path/to/image3.jpg", "path/to/image4.jpg"],
            videos: [],
            description: ['Art', 'Poster', 'Ad'],
            type: 'img',
        },

        {
            name: "Adobe Lightroom",
            logo: "Icons/Lr_Logo.svg",
            backgroundColor: "#001E36",
            accentColor: "#31A8FF",
            imageSource: "Lr_Album/Preview",
            imageCount: 30,
            videoCount: 1,
            images: ["path/to/image3.jpg", "path/to/image4.jpg"],
            videos: [],
            description: ['Editing', 'Color', 'Grading'],
            type: 'img',
        },

        {
            name: "Adobe After Effects",
            logo: "Icons/Ae_Logo.svg",
            backgroundColor: "#00005B",
            accentColor: "#9999FF",
            imageSource: "Ae_Album",
            imageCount: 4,
            videoCount: 15,
            images: ["path/to/image3.jpg", "path/to/image4.jpg"],
            videos: ["/video (1).mp4", "/video (2).mp4", "/video (3).mp4", "/video (4).mp4", "/video (5).mp4", "/video (6).mp4", "/video (7).mp4", "/video (8).mp4", "/video (9).mp4", "/video (10).mp4", "/video (11).mp4", "/video (12).mp4", "/video (13).mp4", "/video (14).mp4", "/video (15).mp4"],
            description: ['Filming', 'Montage', 'Moution'],
            type: 'video',
        },

        {
            name: "Adobe Premiere Pro",
            logo: "Icons/Pr_Logo.svg",
            backgroundColor: "#00005B",
            accentColor: "#9999FF",
            imageSource: "Ae_Album",
            imageCount: 4,
            videoCount: 15,
            images: ["path/to/image3.jpg", "path/to/image4.jpg"],
            videos: ["/video (1).mp4", "/video (2).mp4", "/video (3).mp4", "/video (4).mp4", "/video (5).mp4", "/video (6).mp4", "/video (7).mp4", "/video (8).mp4", "/video (9).mp4", "/video (10).mp4", "/video (11).mp4", "/video (12).mp4", "/video (13).mp4", "/video (14).mp4", "/video (15).mp4"],
            description: ['Filming', 'Montage', 'Moution'],
            type: 'video',
        },

        
    ];

    const containerWidth = `310px`;
    const containerMargin = `40px`;
    const portfolioListBlock = document.querySelector('.portfolio_list');
    portfolioListBlock.innerHTML = `<div class="loading_container"><div class="loading"></div></div>`;
    
    function checkImageExists(src) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);  
            img.onerror = () => resolve(false); 
            img.src = src + '?cacheBust=' + Date.now(); 
        });
    }

    
    async function populateAlbumImages(albums) {
        for (const album of albums) {
            if (album.type == 'img') {
                album.images = [];
                let foundImages = 0;
                let currentIndex = 1;

                while (foundImages < album.imageCount) {
                    const pngPath = `${album.imageSource}/image${currentIndex}.png`;
                    const pngExists = await checkImageExists(pngPath);

                    if (pngExists) {
                        album.images.push(pngPath);
                        foundImages++;
                    } else {
                        const jpgPath = `${album.imageSource}/image${currentIndex}.jpg`;
                        const jpgExists = await checkImageExists(jpgPath);

                        if (jpgExists) {
                            album.images.push(jpgPath);
                            foundImages++;
                        } else {
                            console.warn(`⚠️ Картинка не найдена: ${pngPath} и ${jpgPath}`);
                        }
                    }

                    
                    if (currentIndex > album.imageCount + 10) {
                        console.error(`❗ Превышен лимит попыток загрузки для альбома ${album.name}`);
                        break;
                    }

                    currentIndex++;
                }


                if (album.images.length < album.imageCount) {
                    console.warn(`⚠️ В альбоме "${album.name}" только ${album.images.length} доступных изображений из ${album.imageCount} запрошенных.`);
                }
            }
        }

        
    }

    populateAlbumImages(albums).then(() => {
    

    
    const portfolioList = document.getElementById('port_list');
    if (portfolioList) {
        for (let i = 0; i < 3; i++) {
            albums.forEach(album => {
                const albumElement = document.createElement('div');
                albumElement.classList.add('portfolio_item_container');
                let firstRowImages = '';
                let secondRowImages = '';
                let row1 = '';
                let row2 = '';
                let row1Width = 0;
                let row2Width = 0;

                const imagePromises = album.images.map(src => {
                    return new Promise(resolve => {
                        const img = new Image();
                        img.onload = () => resolve({ src, width: img.naturalWidth });
                        img.src = src;
                    });
                });

                if (album.type == 'img') {
                    Promise.all(imagePromises).then(imageData => {
                        
                        imageData.forEach(({ src, width }, index) => {
                            const tag = `<img src="${src}" alt="Image ${index + 1}" class="portfolio_file" draggable="false">`;
                            if (row1Width <= row2Width) {
                                row1 += tag;
                                row1Width += width;
                                
                            } else {
                                row2 += tag;
                                row2Width += width;
                                
                            }
                        });
                        
                        const portfolio = albumElement.querySelector('.portfolio_files_container');
                        
                        portfolio.innerHTML = `
                            <div class="portfolio_files_row">
                                ${row1}
                            </div>
                            <div class="portfolio_files_row">
                                ${row2}
                            </div>`;
                    })
                } 

                album.images.forEach((img, index) => {
                    const imgTag = `<img src="${img}" alt="Image ${index + 1}" class="portfolio_file">`;
                    if (index < Math.ceil(album.images.length / 2)) {
                        firstRowImages += imgTag;
                    } else {
                        secondRowImages += imgTag;
                    }
                    
                });

                albumElement.innerHTML = `
                    <li class="portfolio_item">
                            <div class="portfolio_bg"  style="background-color: ${album.accentColor};"></div>
                            <div class="portfolio_info">
                                <h3 class="portfolio_name middle_plus_text" style="color: var(--main-bg-color);">${album.name}</h3>
                                <div class="portfolio_description">
                                    <div class="portfolio_item_logo">
                                        <img src="${album.logo}" draggable="false">
                                    </div>
                                    <div class="portfolio_text medium_text">
                                        <p>${album.description[0]}</p>
                                        <p>${album.description[1]}</p>
                                        <p>${album.description[2]}</p>
                                    </div> 
                                    
                                </div>
                                <div class="portfolio_btn_block">
                                    <button class="btn_portfolio middle_plus_text item_shadow_basic" style="color: ${album.accentColor}; background-color: var(--main-bg-color);">Open</button>
                                </div>
                            </div>
                            <div class="portfolio_files ">
                                <div class="portfolio_files_container item_shadow_basic">
                                    <div class="portfolio_files_row">
                                    </div>
                                </div>
                                <div class="portfolio_files_scroll"></div>
                            </div>


                        </li>
                `;

                if (album.type == 'video') {
                    let videoTag = '';
                    album.videos.forEach((video, index) => {
                        videoTag += `
                                    <video 
                                        class="video-js vjs-theme-sea portfolio_video" 
                                        id="my-video" 
                                        controls 
                                        loop 
                                        height="600px"
                                        preload="none"  
                                        
                                        data-setup="{}"
                                        poster="${album.imageSource + `/poster${index + 1}.png`}"
                                        >
                                        
                                        <source src="${album.imageSource + video}" type="video/mp4">
                                        <p class="vjs-no-js">
                                            To view this video please enable JavaScript, and consider upgrading to a
                                            web browser that
                                            <a href="https://videojs.com/html5-video-support/" target="_blank"
                                                >supports HTML5 video</a
                                            >
                                            </p>
                                    </video>
                                    </div>`;
                        
                        
                    });
                    
                    const portfolio = albumElement.querySelector('.portfolio_files_row');
                    
                    portfolio.innerHTML = videoTag;
                }
                
                albumElement.style.maxWidth = containerWidth;
                albumElement.style.marginRight = containerMargin;

                portfolioList.appendChild(albumElement);
            });
        }
        let currentIndex = albums.length; 
        portfolioItems = document.querySelectorAll('.portfolio_item');
        const prevButton = document.getElementById('port_prev');
        const nextButton = document.getElementById('port_next');
        const portfolioListElement = document.getElementById('port_list');
        allPortfolioButtons = document.querySelectorAll('.btn_portfolio');
        active_port = false;

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        allPortfolioButtons.forEach(button => {
            button.addEventListener('click', () => {
                allPortfolioButtons = document.querySelectorAll('.btn_portfolio');
                
                const index = Array.from(allPortfolioButtons).indexOf(button);
                const portfolioContainers = document.querySelectorAll('.portfolio_item_container');
                
                if (!active_port) {
                    portfolioContainers.forEach((container, number) => {
                        if (number != index) {
                            container.style.opacity = '0';
                            
                        } else {
                            container.classList.add('active_port');
                            button.innerHTML = 'Close';
                            active_port = true;
                        }
                    })
                } else {
                    portfolioContainers.forEach((container, number) => {
                        if (number != index) {
                            container.style.opacity = '1';
                            
                        } else {
                            const vjsPlayers = document.querySelectorAll('.vjs-tech')
                            vjsPlayers.forEach(item => {item.pause();})
                            container.classList.remove('active_port');
                            button.innerHTML = 'Open';
                            active_port = false;
                        }
                    })
                }

                const portfolioImages = document.querySelectorAll('.portfolio_file');
                const portGallery = document.getElementById('port_gallery');
                const portGalleryImage = document.getElementById('port_gallery_img');
                portfolioImages.forEach(image => {
                    image.addEventListener('click', () => {
                        
                        portGallery.style.display = 'flex';
                        portGalleryImage.src = image.src.replace('Preview', 'Full');
                    });

                });
                portGallery.addEventListener('click', () => {
                    portGallery.style.display = 'none';
                })


            });
        })

        portfolioItems.forEach(item => {
            item.addEventListener('click', async () => {
                if (active_port) {
                    return; 
                }
                const portfolioContainers = document.querySelectorAll('.portfolio_item_container');
                portfolioItems = document.querySelectorAll('.portfolio_item'); 
                const index = Array.from(portfolioItems).indexOf(item); 

                if (index > currentIndex) {
                    portfolioContainers.forEach((container, number) => {
                        container.classList.add('faster_transition');
                    })
                    const count = index - currentIndex;
                    for (let i = 0; i < count; i++) {
                        rotateListForward(100);
                        await delay(100); 
                    }
                    portfolioContainers.forEach((container, number) => {
                        container.classList.remove('faster_transition');
                    })

                } else if (index < currentIndex) {
                    const count = currentIndex - index;
                    for (let i = 0; i < count; i++) {
                        rotateListBackward();
                    }
                }
            });
        });

        async function transitionElement(newIndex, oldIndex = 0) {
            portfolioItems[oldIndex].classList.remove('show');
            await delay(100);
            
            currentIndex = newIndex;
            await delay(100);
            portfolioItems[newIndex].parentElement.style.maxWidth = '';
            
            portfolioItems[newIndex].classList.add('show');
            
        } 

        const itemWidth = portfolioItems[0]?.offsetWidth || 0;
        const itemMargin = document.querySelector('.portfolio_item_container');
        const computedStyle = getComputedStyle(itemMargin);
        const marginRight = parseFloat(computedStyle.marginRight);
        
        transitionElement(currentIndex)
        portfolioListElement.style.transform = `translateX(-${(currentIndex) * (itemWidth + marginRight)}px)`;

        


        async function rotateListForward(delayTime = 600) {
            const ul = document.getElementById("port_list");
            const items = ul.getElementsByClassName("portfolio_item_container"); 
            portfolioItems = document.querySelectorAll('.portfolio_item');

            const vjsPlayers = document.querySelectorAll('.vjs-tech')
            vjsPlayers.forEach(item => {item.pause();})

            if (items.length > 0) {
                const firstItem = items[0];
                portfolioItems[currentIndex].classList.remove('show');
                portfolioItems[currentIndex].parentElement.style.maxWidth = containerWidth;
                if (!active_port) {
                    items[0].style.maxWidth = '0px';
                    items[0].style.marginRight = '0px';
                    
                    await delay(delayTime); 
                }

                

                ul.removeChild(firstItem);
                portfolioItems[currentIndex + 1].parentElement.style.maxWidth = '';
                portfolioItems[currentIndex + 1].classList.add('show');
                
                
                if (!active_port) {
                    firstItem.style.maxWidth = containerWidth;
                    firstItem.style.marginRight = containerMargin;
                    
                }
                ul.appendChild(firstItem);
                
            }
        }

        async function rotateListBackward() {
            const ul = document.getElementById("port_list");
            const items = ul.getElementsByClassName("portfolio_item_container"); 
            portfolioItems = document.querySelectorAll('.portfolio_item');
            const vjsPlayers = document.querySelectorAll('.vjs-tech')
            vjsPlayers.forEach(item => {item.pause();})
            if (items.length > 0) {
                const lastItem = items[items.length - 1];
                portfolioItems[currentIndex].classList.remove('show');
                portfolioItems[currentIndex].parentElement.style.maxWidth = containerWidth;
                ul.removeChild(lastItem);
                if (!active_port) {
                    lastItem.style.maxWidth = '0px';
                    lastItem.style.marginRight = '0px';
                    
                }
                

                ul.insertBefore(lastItem, items[0]);
                
                if (!active_port) {
                    await delay(100); 
                    lastItem.style.maxWidth = containerWidth;
                    lastItem.style.marginRight = containerMargin;
                    
                    await delay(300);
                    
                }
                
                portfolioItems[currentIndex - 1].parentElement.style.maxWidth = '';
                portfolioItems[currentIndex - 1].classList.add('show');
            }
        }


        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!active_port) {
                    rotateListBackward();
                } else {
                    const portfolioContainers = document.querySelectorAll('.portfolio_item_container');
                    const targetContainer = document.querySelector('.active_port');
                    const index = Array.from(portfolioContainers).indexOf(targetContainer); 
                    const targerBg = targetContainer.querySelector('.portfolio_bg');
                    const targetLogo = targetContainer.querySelector('.portfolio_item_logo');
                    
                    targerBg.style.transition = 'none';
                    targetLogo.style.transition = 'none';
                    targetContainer.classList.remove('active_port');
                    targetContainer.style.opacity = '0';
                    allPortfolioButtons[index].innerHTML = 'Open';
                    nextBG = portfolioContainers[index - 1].querySelector('.portfolio_bg');
                    nextLogo = portfolioContainers[index - 1].querySelector('.portfolio_item_logo');
                    nextLogo.style.transition = 'none';
                    nextBG.style.transition = 'none';
                    portfolioContainers[index - 1].classList.add('active_port');
                    allPortfolioButtons[index - 1].innerHTML = 'Close';
                    portfolioContainers[index - 1].style.opacity = '1';
                    rotateListBackward();
                    allPortfolioButtons = document.querySelectorAll('.btn_portfolio');
                    setTimeout(() => {
                        targerBg.style.transition = '';
                        targetLogo.style.transition = '';
                        nextLogo.style.transition = '';
                        nextBG.style.transition = '';
                        
                    }, 100);
                }
                
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!active_port) {
                    rotateListForward(300);
                } else {
                    const portfolioContainers = document.querySelectorAll('.portfolio_item_container');
                    const targetContainer = document.querySelector('.active_port');
                    const index = Array.from(portfolioContainers).indexOf(targetContainer); 
                    const targerBg = targetContainer.querySelector('.portfolio_bg');
                    const targetLogo = targetContainer.querySelector('.portfolio_item_logo');
                    
                    targerBg.style.transition = 'none';
                    targetLogo.style.transition = 'none';
                    targetContainer.classList.remove('active_port');
                    targetContainer.style.opacity = '0';
                    allPortfolioButtons[index].innerHTML = 'Open';
                    nextBG = portfolioContainers[index + 1].querySelector('.portfolio_bg');
                    nextLogo = portfolioContainers[index + 1].querySelector('.portfolio_item_logo');
                    nextLogo.style.transition = 'none';
                    nextBG.style.transition = 'none';
                    portfolioContainers[index + 1].classList.add('active_port');
                    allPortfolioButtons[index + 1].innerHTML = 'Close';
                    portfolioContainers[index + 1].style.opacity = '1';
                    rotateListForward(50);
                    allPortfolioButtons = document.querySelectorAll('.btn_portfolio');
                    setTimeout(() => {
                        targerBg.style.transition = '';
                        targetLogo.style.transition = '';
                        nextLogo.style.transition = '';
                        nextBG.style.transition = '';
                        
                    }, 100);

                }
                
            });
        }

        
    }


});
    });
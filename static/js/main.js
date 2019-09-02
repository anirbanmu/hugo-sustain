/**
 * Created by fabiomadeira on 25/02/15.
 */
// jQuery for page scrolling feature
jQuery(document).ready(function(e) {
    e(".scroll").click(function(t) {
        t.preventDefault();
        e("html,body").animate({
            scrollTop: e(this.hash).offset().top
        }, 1e3)
    })

    /**  lazy image loading  */

    let lazyloadImages;

    if ("IntersectionObserver" in window) {

        lazyloadImages = document.querySelectorAll(".lazy");
        let imageObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {


                let image = entry.target;
                let smallImg = new Image();
                smallImg.src = image.src;
                smallImg.onload = function () {
                    image.classList.add('loaded');
                };

                if (entry.isIntersecting) {

                    let ogImage = new Image();

                    ogImage.src = image.dataset.src;
                    ogImage.onload = function(){
                        ogImage.classList.add("loaded")
                    }

                    image.parentNode.appendChild(ogImage)
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        // fall back to older browsers
        let lazyloadThrottleTimeout;

        lazyloadImages = e(".lazy");
        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                let scrollTop = window.pageYOffset;

                lazyloadImages.each(function(index,img){
                    if(!img)
                        return;

                    let smallImg = new Image();
                    smallImg.src = img.src;
                    smallImg.onload = function () {
                        img.classList.add('loaded');
                    };

                    if (e(img).offset().top < (window.innerHeight + scrollTop)) {

                        let ogImage = new Image();

                        ogImage.src = img.dataset.src;
                        ogImage.onload = function () {
                            ogImage.classList.add("loaded")
                        }

                        img.parentNode.appendChild(ogImage);
                        img.classList.remove('lazy');
                        lazyloadImages.splice(index, 1)
                    }



                });

                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
        lazyload();
    }

});




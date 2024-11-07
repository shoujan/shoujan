<script>
        let currentIndex = 0;
        const slider = document.getElementById('slider');
        const totalSlides = document.querySelectorAll('.slide').length;
        const videos = [
            document.getElementById('video1').contentWindow,
            document.getElementById('video2').contentWindow,
            document.getElementById('video3').contentWindow,
            document.getElementById('video4').contentWindow
        ];

        function showSlide(index) {
            slider.style.transform = `translateX(${-index * 100}%)`;
            autoplayVideos(index);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        }

        function autoplayVideos(index) {
            // Stop all videos first
            videos.forEach((video) => {
                video.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            });

            // Play both videos on the current slide
            videos[index * 2].postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            if (videos[index * 2 + 1]) {
                videos[index * 2 + 1].postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        }

        // Auto slide change every 4 seconds
        setInterval(nextSlide, 4000);
    </script>

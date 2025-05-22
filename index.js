const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, 
    yValue = 0;

    let rotateDegree = 0;

    function update(cursosPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx || 0;;
        let speedy = el.dataset.speedy || 0;;
        let speedz = el.dataset.speedz || 0;;
        let rotateSpeed = el.dataset.rotation || 0;;
    
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursosPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
    
        console.log(zValue);
    
        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px))
                              rotateY(${rotateDegree * rotateSpeed}deg)
                              translateY(calc(-50% + ${yValue * speedy}px))
                              perspective(2300px)
                              translateZ(${zValue * speedz}px)`;
        });
    }

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    console.log(xValue, yValue);

    rotateDegree = (xValue / (window.innerWidth /  2)) * 20;

    update(e.clientX);
});

/*Testing GSAP Library Animation*/ 

let timeline = gsap.timeline();

Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) => {

    let initialTop = parseFloat(getComputedStyle(el).top) + (+el.dataset.distance || 0);

    gsap.set(el, {top: initialTop});

    timeline.to(el, {
        top: getComputedStyle(el).top,
        duration: 1,
        ease: "power3.out",
    }, "1"); // Tempo de início da animação
});

const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main")

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
    if(timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    console.log(xValue, yValue);

    rotateDegree = (xValue / (window.innerWidth /  2)) * 20;

    update(e.clientX);
});

if(window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`
}

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

timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 2,
    },"2.5")
    .from(".text h2", {
        y:-150,
        opacity:0,
        duration:1.5,
    },"2")
    .from(".hide", {
        opacity: 0,
        duration: 1.5,
    }, "2")
var t1=gsap.timeline()
t1.from("#loader h3",{
    x:40,
    opacity:0,
    duration:1.3,
    stagger:0.1
})

t1.to("#loader h3",{
    opacity:0,
    x:-20,
    duration:1,
    stagger:0.1

})

t1.to("#loader",{
    opacity:0,

})

t1.to("#loader",{
    display:"none",

})
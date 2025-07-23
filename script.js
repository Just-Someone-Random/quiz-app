const themeBtn=document.getElementById('theme-btn');
const body=document.body;

themeBtn.addEventListener('click',function(){
  body.classList.toggle('lightmode');
});
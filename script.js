const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));}
document.querySelector('#year').textContent=new Date().getFullYear();
// Custom cursor + broad pointer highlight. Native pointer remains available for touch devices.
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.body.classList.add('custom-pointer');
 const cursor=document.createElement('div');cursor.className='custom-cursor';cursor.setAttribute('aria-hidden','true');document.body.appendChild(cursor);
 const glow=document.querySelector('.cursor-glow');
 let x=innerWidth/2,y=innerHeight/2,gx=x,gy=y;
 document.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;cursor.style.left=x+'px';cursor.style.top=y+'px';if(glow){glow.style.left=x+'px';glow.style.top=y+'px'}});
 document.querySelectorAll('a,button,summary,select,input,textarea,.service-card,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('is-hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hover'))});
}
const form=document.querySelector('#contactForm');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const status=document.querySelector('#formStatus');const data=new FormData(form);const payload=new URLSearchParams();for(const key of ['name','company','email','service','message'])payload.append(key,data.get(key)||'');status.textContent='Sending your enquiry…';
/* Preview mode: connect to the existing H23 Apps Script endpoint when available. */
const endpoint='https://script.google.com/macros/s/AKfycbwg5pZKvs32_PbmMFATSSln6OVFZb0rR5A8kDtYmkFU2Z65ArLKhMtwAhBxxEyNct4M2A/exec';
try{await fetch(endpoint,{method:'POST',body:payload,mode:'no-cors'});status.textContent='Your enquiry has been submitted. If you do not receive a response, please email h23workss@gmail.com.';form.reset();}
catch(err){const body=`H23 Website Enquiry\\n\\nName: ${data.get('name')}\\nCompany: ${data.get('company')||'Not provided'}\\nEmail: ${data.get('email')}\\nService: ${data.get('service')}\\n\\nMessage:\\n${data.get('message')}`;status.textContent='Could not submit automatically. Opening a Gmail draft…';const gmail=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('h23workss@gmail.com')}&su=${encodeURIComponent('H23 Website Enquiry - '+data.get('service'))}&body=${encodeURIComponent(body)}`;window.open(gmail,'_blank','noopener,noreferrer');}
});}

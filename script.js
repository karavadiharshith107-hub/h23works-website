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
});
}
// H23 Works: Keep navigation highlighting in sync with page sections.
const nav = document.querySelector('#nav');
const navLinks = nav
  ? Array.from(nav.querySelectorAll('a[href^="#"]'))
  : [];

const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(section => section && section.matches('main section[id]'));

if (navLinks.length && sections.length) {
  let ticking = false;
  let clickLockUntil = 0;

  const setActive = (id) => {
    navLinks.forEach(link => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);

      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      setActive(target.id);
      clickLockUntil = Date.now() + 700;
    });
  });

  const updateActiveFromScroll = () => {
    ticking = false;

    if (Date.now() < clickLockUntil) return;

    const header = document.querySelector('.topbar');
    const activationY =
      (header?.getBoundingClientRect().height || 78) + 24;

    let current = sections[0];

    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= activationY) {
        current = section;
      }
    });

    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      current = sections[sections.length - 1];
    }

    setActive(current.id);
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateActiveFromScroll);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);

  window.addEventListener('hashchange', () => {
    const target = document.querySelector(location.hash);
    if (target && target.matches('main section[id]')) {
      setActive(target.id);
    }
  });

  requestUpdate();


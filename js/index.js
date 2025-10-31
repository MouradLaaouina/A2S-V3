// ================================================
// JavaScript pour SPLASH
// ================================================

// ========= Utilities =========
  const clamp=(v,min,max)=>Math.min(Math.max(v,min),max);

  // ========= Particle System (optimized) =========
  class ParticleSystem{
    constructor(canvas){
      this.canvas=canvas; this.ctx=canvas.getContext('2d');
      this.particles=[]; this.mouse={x:0,y:0,active:false};
      this.frame=0; this.running=true; this.deviceScale=clamp(window.devicePixelRatio||1,1,2);
      this._raf=null;
      this.resize();
      this.spawn();
      this.animate=this.animate.bind(this);
      this.animate();
      document.addEventListener('visibilitychange',()=>{
        this.running=!document.hidden; if(this.running) this.animate();
      });
    }
    resize(){
      const {innerWidth:w, innerHeight:h}=window; const scale=this.deviceScale;
      this.canvas.width=w*scale; this.canvas.height=h*scale; this.canvas.style.width=w+'px'; this.canvas.style.height=h+'px';
      this.ctx.setTransform(scale,0,0,scale,0,0);
    }
    spawn(){
      const count = Math.min(200, Math.floor(window.innerWidth/7));
      this.particles.length=0;
      for(let i=0;i<count;i++){
        this.particles.push({
          x:Math.random()*window.innerWidth,
          y:Math.random()*window.innerHeight,
          vx:(Math.random()-.5)*.45,
          vy:(Math.random()-.5)*.45,
          s:Math.random()*2+0.8,
          o:Math.random()*.5+.25,
          c:Math.random()>.7?'#00E676':'#d1d1d1', // Vert au lieu de or
          life:Math.random()*120+60, max:180
        });
      }
    }
    setMouse(x,y){this.mouse.x=x; this.mouse.y=y; this.mouse.active=true}
    unsetMouse(){this.mouse.active=false}
    animate(){
      if(!this.running) return;
      const ctx=this.ctx; const W=window.innerWidth, H=window.innerHeight;
      ctx.clearRect(0,0,W,H);
      // lightweight connections every 3 frames
      if((this.frame%3)===0) this.drawLinks(95);
      for(const p of this.particles){
        // gentle attraction
        if(this.mouse.active){
          const dx=this.mouse.x-p.x, dy=this.mouse.y-p.y; const d=Math.hypot(dx,dy);
          if(d<140){ const f=(140-d)/140; p.vx+= (dx/(d||1))*f*0.02; p.vy+=(dy/(d||1))*f*0.02; }
        }
        p.x+=p.vx; p.y+=p.vy;
        // wrap
        if(p.x<0) p.x=W; if(p.x>W) p.x=0; if(p.y<0) p.y=H; if(p.y>H) p.y=0;
        // life/opac
        p.life-=1; if(p.life<=0){ p.life=p.max; p.o=Math.random()*.5+.25 }
        ctx.save(); ctx.globalAlpha=p.o*(p.life/p.max); ctx.fillStyle=p.c; ctx.shadowBlur=12; ctx.shadowColor=p.c;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,Math.PI*2); ctx.fill(); ctx.restore();
      }
      this.frame++; this._raf=requestAnimationFrame(this.animate);
    }
    drawLinks(radius){
      const pts=this.particles, ctx=this.ctx; ctx.lineWidth=1; ctx.strokeStyle='rgba(0,230,118,.10)'; // Vert
      // spatial hashing grid to avoid O(n^2)
      const cell=120, cols=Math.ceil(window.innerWidth/cell), rows=Math.ceil(window.innerHeight/cell);
      const grid=new Array(cols*rows).fill(0).map(()=>[]);
      for(let i=0;i<pts.length;i++){
        const p=pts[i]; const cx=Math.floor(p.x/cell), cy=Math.floor(p.y/cell); grid[cy*cols+cx].push(i);
      }
      const neigh=[0,1,-1,cols, -cols, cols+1, cols-1, -cols+1, -cols-1];
      for(let gi=0;gi<grid.length;gi++){
        const bucket=grid[gi]; if(bucket.length===0) continue;
        for(const di of neigh){ const nb=grid[gi+di]; if(!nb) continue;
          for(const i of bucket){ for(const j of nb){ if(j<=i) continue;
            const a=pts[i], b=pts[j]; const dx=a.x-b.x, dy=a.y-b.y; const d=Math.hypot(dx,dy);
            if(d<radius){ ctx.globalAlpha=(radius-d)/radius*.35; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
          }}
        }
      }
    }
    destroy(){ this.running=false; cancelAnimationFrame(this._raf); this.particles.length=0; }
  }

  // ========= Sparkles (decorative) =========
  function spawnSparkles(container){
    const make=()=>{
      const s=document.createElement('span'); s.className='sp';
      const x=Math.random()*100, y=Math.random()*100, d=800+Math.random()*1200;
      Object.assign(s.style,{position:'absolute', left:x+'%', top:y+'%', width:'2px', height:'2px',
        background:'currentColor', color:'#00E676', borderRadius:'50%', filter:'drop-shadow(0 0 6px #00E676)',
        opacity:'0', transform:'translate(-50%,-50%) scale(1)', transition:`opacity ${d}ms linear, transform ${d}ms ease-out`});
      container.appendChild(s);
      requestAnimationFrame(()=>{ s.style.opacity='1'; s.style.transform='translate(-50%,-60%) scale(1.8)'; });
      setTimeout(()=>{ s.style.opacity='0'; s.style.transform='translate(-50%,-30%) scale(.6)'; }, d*0.7);
      setTimeout(()=>{ s.remove(); }, d+400);
    };
    const id=setInterval(make, 450);
    return ()=>clearInterval(id);
  }

  // ========= Animation Controller =========
  class SplashController{
    constructor(){
      this.particles=null; this.sparkleStop=null; this.done=false;
      this.$={
        splash:document.getElementById('splashScreen'),
        brand:document.getElementById('brandName'),
        tagline:document.getElementById('tagline'),
        cta:document.getElementById('enterText'),
        logo:document.getElementById('logoImg'),
        sparkles:document.getElementById('sparkles'),
      };
      this.init();
    }
    init(){
      const canvas=document.getElementById('particleCanvas');
      this.particles=new ParticleSystem(canvas);

      // Input
      window.addEventListener('resize',()=>this.particles.resize(), {passive:true});
      document.addEventListener('mousemove',(e)=>this.particles.setMouse(e.clientX,e.clientY));
      document.addEventListener('mouseleave',()=>this.particles.unsetMouse());
      document.addEventListener('touchmove',(e)=>{const t=e.touches[0]; if(t) this.particles.setMouse(t.clientX,t.clientY)}, {passive:true});

      // Enter interactions
      const enter=()=>this.enter();
      this.$.splash.addEventListener('click',(e)=>{ if(!(e.target.closest('#skipBtn'))) enter(); });
      document.getElementById('skipBtn').addEventListener('click', enter);
      window.addEventListener('keydown',(e)=>{ if(e.key==='Enter') enter(); });

      // Start sequence
      this.sequence();

      // Auto enter failsafe (7.5s)
      this.autoTimer=setTimeout(()=>{ if(!this.done) this.enter(); }, 7500);
    }
    sequence(){
      // logo reveal + halo
      const logo=this.$.logo, brand=this.$.brand, tag=this.$.tagline, cta=this.$.cta;
      // fallback if logo fails
      logo.addEventListener('error',()=>{ logo.style.display='none'; });
      setTimeout(()=>{
        logo.style.opacity='1'; logo.style.transform='translateY(0) scale(1)';
        logo.parentElement?.classList.add('on');
        logo.parentElement?.style.setProperty('--halo','1');
        logo.parentElement?.style.setProperty('animation','floaty 6s ease-in-out infinite');
        logo.parentElement?.querySelector(':scope::after'); // for CSS paint
        logo.parentElement && (logo.parentElement.style.setProperty('filter','saturate(1.02)'));
        logo.parentElement && (logo.parentElement.style.setProperty('transform','translateZ(0)'));
        logo.parentElement && (logo.parentElement.style.setProperty('will-change','transform'));
        logo.parentElement && (logo.parentElement.style.setProperty('animation','floaty 7s ease-in-out infinite'));
        logo.parentElement && (logo.parentElement.style.setProperty('transition','opacity .8s ease, transform .8s ease'));
        // halo visible
        const halo=logo.parentElement; if(halo) halo.style.setProperty('opacity','1');
        const ring=logo.parentElement; if(ring) ring.style.setProperty('--halo','1');
        // activate halo ::after
        const lw=logo.parentElement; if(lw) lw.style.setProperty('--haloOn','1');
        // show halo element
        const after=logo.parentElement; if(after) after.style.setProperty('filter','');
        logo.parentElement && (logo.parentElement.style.setProperty('--on','1'));
        // reveal shimmer on brand
        brand.style.opacity='1'; brand.style.transform='translateY(0) scale(1)';
        brand.animate([
          { clipPath:'inset(0 100% 0 0)', offset:0 },
          { clipPath:'inset(0 0 0 0)', offset:1 }
        ], { duration:900, easing:'cubic-bezier(.2,.8,.2,1)' });
        brand.style.setProperty('--shine','1');
        brand.style.setProperty('position','relative');
        brand.style.setProperty('overflow','hidden');
        brand.style.setProperty('contain','paint');
        brand.style.setProperty('will-change','transform');
        // shimmer sweep
        brand.animate([
          { transform:'translateY(0)', opacity:1 },
          { transform:'translateY(0)', opacity:1 }
        ], { duration:1200 });
        brand.addEventListener('animationend',()=>{}, {once:true});
        brand.style.setProperty('--shimmer','1');
        brand.style.setProperty('mask','linear-gradient(90deg, transparent, black 10% 90%, transparent)');
        brand.style.setProperty('--mask','1');
        brand.style.setProperty('--mix-blend-mode','screen');
        brand.style.setProperty('--ts','0 0 30px rgba(0,230,118,.45)');
        // per-letter pop
        const letters=brand.querySelectorAll('.brand-letter');
        letters.forEach((el,i)=>{
          setTimeout(()=>{
            el.style.transform='translateY(0) scale(1)'; el.style.color='var(--white)';
            el.style.textShadow='0 0 40px rgba(0,230,118,.65)';
            setTimeout(()=>{ el.style.textShadow='0 0 0 rgba(0,0,0,0)'; }, 500);
          }, i*90);
        });
      }, 400);

      // tagline
      setTimeout(()=>{ tag.style.opacity='1'; tag.style.transform='translateY(0)'; }, 2200);
      // sparkles start
      setTimeout(()=>{ this.sparkleStop = spawnSparkles(this.$.sparkles); }, 2600);
      // CTA
      setTimeout(()=>{ tag.style.opacity='1'; tag.style.transform='translateY(0)';}, 3400);
    }
    enter(){
      if(this.done) return; this.done=true; clearTimeout(this.autoTimer);
      this.$.splash.classList.add('fade-out');
      setTimeout(()=>{
        // Redirection vers la page d'accueil principale
        window.location.href = '';
      }, 800);
    }
  }

  // Boot
  let controller;
  window.addEventListener('load',()=>{ controller=new SplashController(); });

  // Redirection au clic n'importe où sur le body
  document.addEventListener('DOMContentLoaded', function() {
      document.body.addEventListener('click', function() {
          window.location.href = 'accueil.html';
      });
      
      // Redirection avec Entrée
      document.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
              window.location.href = 'accueil.html';
          }
      });
  });

  // Optional: context menu disabled like original (comment to re-enable)
  document.addEventListener('contextmenu', e=> e.preventDefault());


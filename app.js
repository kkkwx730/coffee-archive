'use strict';
let coffees=[];
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const palettes=['#d6c3a6','#b9c7b4','#d7b9a6','#cbb7a0','#c2ad9f','#b5aa9d'];
const PROCESS_INFO={
 '水洗':{title:'水洗法 · Washed',text:'採收後先去除果皮與果肉，透過發酵或機械方式清除果膠，再洗淨、乾燥。常見清晰酸質與乾淨風味，但實際表現仍取決於產地、品種與烘焙。',steps:'採收 → 去果皮 → 去果膠 → 清洗 → 乾燥'},
 '日曬':{title:'日曬法 · Natural',text:'讓完整咖啡果實在日光或受控環境下乾燥，之後才去除乾燥果皮與果肉。常見熟果、莓果與較飽滿的甜感；需謹慎控制乾燥與發酵。',steps:'採收 → 整果乾燥 → 脫殼 → 分級'},
 '半水洗':{title:'半水洗法 · Semi-washed',text:'廣義上指部分果肉或果膠去除後乾燥的處理方式；不同國家、業者的用語與細節可能不同。印尼常見的濕刨處理在部分星巴克資料中歸為半水洗。',steps:'採收 → 去果皮 → 部分去膠／短暫乾燥 → 後續處理'},
 '濕刨':{title:'濕刨法 · Wet-hulled / Giling Basah',text:'印尼蘇門答臘常見的處理方式，在生豆含水量仍較高時去除羊皮紙層，再進行後續乾燥。常見厚實醇度、草本與大地調性；不同於一般水洗法。',steps:'採收 → 去果皮 → 初步乾燥 → 濕刨去殼 → 再乾燥'},
 '蜜處理':{title:'蜜處理法 · Honey',text:'去除果皮後，保留部分果膠層乾燥。依果膠保留量及乾燥管理，可能呈現不同甜感與口感；「蜜」指黏稠果膠，並非添加蜂蜜。',steps:'採收 → 去果皮 → 保留果膠 → 乾燥 → 脫殼'},
 '厭氧':{title:'厭氧發酵 · Anaerobic',text:'在低氧或密閉容器內控制咖啡果實或生豆的發酵條件。這是發酵管理方式，可搭配水洗、日曬等後續處理，不能一概視為獨立的乾燥方法。',steps:'採收 → 密閉／低氧發酵 → 水洗或日曬等處理 → 乾燥'}
};
function processKey(s){if(!s)return null;if(s.includes('濕剝')||s.includes('濕刨'))return '濕刨';if(s.includes('半水洗'))return '半水洗';if(s.includes('水洗'))return '水洗';if(s.includes('日曬')||s.includes('自然處理'))return '日曬';return null;}
// Original abstract flavor artwork; no external photos, fonts or image files required.
function flavorArt(c,detail=false){
 const seed=[...c.id].reduce((h,ch)=>(h*31+ch.charCodeAt(0))>>>0,17);
 const roast=c.roast||'';
 const hues=roast.includes('深')?['#58463d','#9b7661','#dfc5a5']:roast.includes('黃金')||roast.includes('淺')?['#697e68','#b3a17b','#e7d5b2']:['#6c7166','#a58a72','#dbc5aa'];
 const [ink,mid,light]=hues;
 const n=c.notes||[];
 const rings=3+(seed%3), angle=seed%90;
 const circles=Array.from({length:rings},(_,i)=>`<circle cx="150" cy="116" r="${29+i*19}" fill="none" stroke="${ink}" stroke-width="${i===0?1.7:.85}" opacity="${.55-i*.09}" ${i%2?'stroke-dasharray="2 6"':''}/>`).join('');
 const petals=Array.from({length:8},(_,i)=>`<ellipse cx="150" cy="${76-(seed%13)}" rx="${6+seed%5}" ry="${17+seed%11}" fill="none" stroke="${ink}" stroke-width="1.1" transform="rotate(${angle+i*45} 150 116)" opacity=".64"/>`).join('');
 const rays=Array.from({length:6},(_,i)=>`<path d="M150 116 L150 ${24+seed%18}" stroke="${ink}" stroke-width=".75" opacity=".25" transform="rotate(${i*60+angle} 150 116)"/>`).join('');
 const label=esc(c.name.split(/[・ ]/).slice(-2).join(' ').toUpperCase());
 const subtitle=esc(n.slice(0,2).join(' · ')||c.origin);
 const uid=esc(c.id.replace(/[^a-z0-9-]/gi,''));
 return `<div class="flavorArtwork" role="img" aria-label="${esc(c.name)}的原創抽象風味圖形，非產品照片" style="width:100%;height:100%;min-height:${detail?'260':'180'}px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:${light};border-radius:2px"><svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="14" y="14" width="272" height="232" rx="1" fill="none" stroke="${ink}" stroke-opacity=".26"/><text x="27" y="34" fill="${ink}" font-size="9" letter-spacing="2">FLAVOR STUDY / ${esc(c.category)}</text><g>${rays}${circles}${petals}<circle cx="150" cy="116" r="8" fill="${mid}"/><circle cx="150" cy="116" r="3" fill="${ink}"/></g><text x="150" y="206" text-anchor="middle" fill="${ink}" font-size="13" font-weight="600" letter-spacing=".7">${label.length>26?esc(c.origin):label}</text><text x="150" y="226" text-anchor="middle" fill="${ink}" font-size="10" letter-spacing="1">${subtitle}</text><text x="272" y="34" text-anchor="end" fill="${ink}" font-size="9">${String(seed%99).padStart(2,'0')}</text></svg></div>`;
}
function imageHtml(c,detail=false){return flavorArt(c,detail);}
function render(){const q=$('search').value.trim().toLocaleLowerCase(),r=$('roast').value,p=$('process').value,cat=$('category').value;
 const shown=coffees.filter(c=>(!cat||c.category===cat)&&(!r||c.roast===r)&&(!p||c.process.includes(p))&&[c.name,c.origin,c.region,c.process,c.year,c.category,...c.notes].join(' ').toLocaleLowerCase().includes(q));
 $('count').textContent=`${String(shown.length).padStart(2,'0')} ENTRIES`;
 $('grid').innerHTML=shown.length?shown.map(c=>`<button class="coffeeCard" data-id="${esc(c.id)}" aria-label="查看${esc(c.name)}詳細資訊"><div class="cardArt" style="background:${palettes[coffees.indexOf(c)%palettes.length]}"><span class="cardNum">${esc(c.category)}</span>${c.category==='示範檔案'?'<div class="cardBean"></div>':`<div class="cardPhoto">${imageHtml(c)}</div>`}<span class="cardRoast">${esc(c.roast)} / ${esc(c.process)}</span></div><div class="cardInfo"><div class="cardMeta">${esc(c.year||c.origin)} · ${esc(c.origin)}</div><h3>${esc(c.name)}</h3><p>${esc(c.description)}</p><div class="tags">${c.notes.map(n=>`<span>${esc(n)}</span>`).join('')}</div><div class="view">閱讀咖啡故事 <span>↗</span></div></div></button>`).join(''):'<div class="empty">找不到符合條件的咖啡，請調整搜尋或篩選。</div>';
}
function officialLinks(c){
 if(c.category==='示範檔案')return '';
 const direct=c.sourceUrl&&/^https:\/\/www\.starbucks\.com\.tw\//.test(c.sourceUrl);
 const link=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:11px 14px;border:1px solid #b89d83;border-radius:5px;color:#63452e;text-decoration:none">${label} ↗</a>`;
 return `<div class="officialLinks" style="display:flex;flex-wrap:wrap;gap:10px;margin:18px 0">${direct?link(c.sourceUrl,'查看星巴克官方產品頁'):''}${c.officialCatalogUrl?link(c.officialCatalogUrl,'瀏覽星巴克官方咖啡豆圖鑑'):''}</div>`;
}
function openDetail(id){const c=coffees.find(x=>x.id===id);if(!c)return;const pk=processKey(c.process);$('detailBody').innerHTML=`<div class="detailMeta">${esc(c.category)} · ${esc(c.year||'COFFEE PROFILE')}</div><h2 class="detailTitle">${esc(c.name)}</h2>${c.category==='示範檔案'?'':`<div class="detailPhoto">${imageHtml(c,true)}</div>`}<p class="detailText">${esc(c.description)}</p><dl class="detailTable"><dt>產區</dt><dd>${esc(c.origin)}${c.region!==c.origin?' · '+esc(c.region):''}</dd><dt>處理法</dt><dd>${esc(c.process)} ${pk?`<a href="#processing" class="processJump" data-process="${pk}">了解處理法 ↗</a>`:''}</dd><dt>烘焙程度</dt><dd>${esc(c.roast)}</dd><dt>風味筆記</dt><dd>${c.notes.map(esc).join('、')}</dd></dl><div class="storyBlock"><b>COFFEE STORY · 咖啡故事</b><p>${esc(c.story)}</p></div><div class="detailBrew"><b>BREWING SUGGESTION</b><p>${esc(c.brew)}</p></div>${officialLinks(c)}<p class="disclaimer">資料來源：${c.sourceUrl?`<a href="${esc(c.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(c.sourceLabel)} ↗</a>`:esc(c.sourceLabel)}。未確認欄位以「待確認」標示；PPK 資料為使用者提供之截圖摘錄，非官網即時販售資訊。</p>`;$('detail').showModal();}
function renderProcessing(){const items=[['水洗','01'],['日曬','02'],['半水洗','03'],['濕刨','04'],['蜜處理','05'],['厭氧','06']];$('processGrid').innerHTML=items.map(([k,n])=>`<article class="processCard" id="process-${k}"><span>${n} / PROCESS</span><h3>${esc(PROCESS_INFO[k].title)}</h3><p>${esc(PROCESS_INFO[k].text)}</p><div class="processSteps">${esc(PROCESS_INFO[k].steps)}</div></article>`).join('');}
async function init(){renderProcessing();try{const res=await fetch('./coffees.json');if(!res.ok)throw new Error('HTTP '+res.status);const data=await res.json();if(!Array.isArray(data))throw new Error('Invalid data');coffees=data;const roast=[...new Set(data.map(c=>c.roast))].sort();$('roast').innerHTML='<option value="">全部烘焙</option>'+roast.map(v=>`<option>${esc(v)}</option>`).join('');render();}catch(e){$('grid').innerHTML='<div class="empty">資料讀取失敗。請使用 GitHub Pages 或本機伺服器開啟網站。</div>';console.error(e);}}
$('search').addEventListener('input',render);$('roast').addEventListener('change',render);$('process').addEventListener('change',render);$('category').addEventListener('change',render);
$('grid').addEventListener('click',e=>{const card=e.target.closest('[data-id]');if(card)openDetail(card.dataset.id)});
$('detailBody').addEventListener('click',e=>{const link=e.target.closest('[data-process]');if(link){$('detail').close();const el=$('process-'+link.dataset.process);if(el){setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'center'}),30)}}});
$('closeDetail').addEventListener('click',()=>$('detail').close());$('detail').addEventListener('click',e=>{if(e.target===$('detail'))$('detail').close()});
$('menuBtn').addEventListener('click',()=>{const opened=$('nav').classList.toggle('open');$('menuBtn').setAttribute('aria-expanded',String(opened))});$('nav').addEventListener('click',e=>{if(e.target.closest('a')){$('nav').classList.remove('open');$('menuBtn').setAttribute('aria-expanded','false')}});init();

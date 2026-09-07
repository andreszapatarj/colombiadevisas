/* =========================================================
   Autenticación del panel privado (prototipo).
   - Las contraseñas nunca se guardan en texto plano: se
     derivan con PBKDF2 (SHA-256, 100.000 iteraciones) + salt
     aleatorio por usuario, usando la Web Crypto API nativa.
   - En producción esto debe vivir en un backend real con su
     propia base de datos; aquí se simula con localStorage
     para que el prototipo funcione sin servidor.
   ========================================================= */
const ADMIN_KEY = "vc_admin";
const SESSION_KEY = "vc_admin_session";

function bufToHex(buf){
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}
function randomSaltHex(len = 16){
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return bufToHex(arr);
}
function hexToBuf(hex){
  const bytes = new Uint8Array(hex.length/2);
  for(let i=0;i<hex.length;i+=2) bytes[i/2] = parseInt(hex.substr(i,2),16);
  return bytes.buffer;
}

async function derivePasswordHash(password, saltHex, iterations = 100000){
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBuf(saltHex), iterations, hash: "SHA-256" },
    keyMaterial, 256
  );
  return bufToHex(bits);
}

async function bootstrapDefaultAdmin(){
  const existing = localStorage.getItem(ADMIN_KEY);
  if(existing) return JSON.parse(existing);
  const salt = randomSaltHex();
  const hash = await derivePasswordHash("CambiaEsta123!", salt);
  const record = { username: "admin", salt, hash, firstLogin: true };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(record));
  return record;
}

function getAdminRecord(){
  const raw = localStorage.getItem(ADMIN_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function verifyLogin(username, password){
  const rec = getAdminRecord();
  if(!rec) return { ok:false };
  if(username.trim().toLowerCase() !== rec.username.toLowerCase()) return { ok:false };
  const hash = await derivePasswordHash(password, rec.salt);
  return { ok: hash === rec.hash, firstLogin: rec.firstLogin };
}

async function updateCredentials(newUsername, newPassword){
  const salt = randomSaltHex();
  const hash = await derivePasswordHash(newPassword, salt);
  const record = { username: newUsername.trim(), salt, hash, firstLogin: false };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(record));
}

function startSession(){ sessionStorage.setItem(SESSION_KEY, "1"); }
function endSession(){ sessionStorage.removeItem(SESSION_KEY); }
function hasSession(){ return sessionStorage.getItem(SESSION_KEY) === "1"; }

/* Bloqueo simple ante intentos fallidos repetidos (protección básica
   contra fuerza bruta desde el navegador; en producción esto debe
   reforzarse también en el servidor). */
const ATTEMPTS_KEY = "vc_login_attempts";
function registerFailedAttempt(){
  const data = JSON.parse(sessionStorage.getItem(ATTEMPTS_KEY) || '{"count":0,"lockUntil":0}');
  data.count += 1;
  if(data.count >= 5){
    data.lockUntil = Date.now() + 30000; // 30s de bloqueo
    data.count = 0;
  }
  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
}
function clearAttempts(){ sessionStorage.removeItem(ATTEMPTS_KEY); }
function isLocked(){
  const data = JSON.parse(sessionStorage.getItem(ATTEMPTS_KEY) || '{"count":0,"lockUntil":0}');
  return data.lockUntil > Date.now() ? Math.ceil((data.lockUntil - Date.now())/1000) : 0;
}

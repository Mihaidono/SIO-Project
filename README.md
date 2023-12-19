# Sistem de monitorizare a culturilor

## Descriere

Acest proiect cuprinde componente pentru monitorizarea și controlul datelor de mediu, incluzând:

- Frontend (Angular)
- Stocare Date Backend (Python)
- Endpointuri API Backend (Java Spring Boot)
- Colectare Date Senzori Încorporați (Arduino)

## Descrierea Proiectului

Acest depozit conține codul pentru un sistem de monitorizare a mediului care colectează date de la diverse senzori, precum temperatură, luminozitate și eventual umiditate. Datele colectate sunt procesate, stocate și făcute accesibile prin API-uri pentru analize și control suplimentar.

### Componente

#### Frontend (Angular)

Frontend-ul Angular oferă o interfață de utilizator pentru interacțiunea cu sistemul. Comunică cu serverele backend pentru afișarea și gestionarea datelor de mediu colectate.

#### Stocare Date Backend (Python)

Backend-ul Python este responsabil pentru stocarea și recuperarea datelor obținute de la senzori. Asigură stocarea securizată și organizată a datelor de mediu colectate.

#### Endpointuri API Backend (Java Spring Boot)

Backend-ul Java Spring Boot gestionează endpointurile API. Oferă interfețe pentru frontend pentru a interacționa cu datele stocate și pentru a controla funcționalitățile sistemului.

#### Colectare Date Senzori Încorporați (Arduino)

Partea încorporată a proiectului implică programare bazată pe Arduino pentru citirea datelor de la senzorii de temperatură, luminozitate și umiditate. Datele colectate sunt apoi expuse serverelor backend prin endpointuri definite.

## Instrucțiuni de Configurare

### Frontend (Angular)

- Navighează către directorul `frontend`.
- Urmărește instrucțiunile din fișierul README din directorul `frontend` pentru a configura și rula aplicația Angular.

### Stocare Date Backend (Python)

- Navighează către directorul `backend-python`.
- Urmărește instrucțiunile din fișierul README din directorul `backend-python` pentru a configura și rula backend-ul Python.

### Endpointuri API Backend (Java Spring Boot)

- Navighează către directorul `backend-java-spring`.
- Urmărește instrucțiunile din fișierul README din directorul `backend-java-spring` pentru a configura și rula backend-ul Java Spring Boot.

### Colectare Date Senzori Încorporați (Arduino)

- Încarcă codul Arduino (ino) furnizat în hardware-ul respectiv (de exemplu, ESP32).
- Configurează pinii și conexiunile pentru senzori conform codului furnizat.

## Utilizare

1. **Accesarea Frontend-ului:**
   - Accesează URL-ul frontend-ului sau local host după ce ai pornit serverul Angular pentru a interacționa cu interfața de utilizator.

2. **Endpointuri API:**
   - Folosește endpointurile API furnizate de backend-ul Java Spring Boot pentru a prelua și gestiona datele. Consultă documentația API pentru detalii despre endpointurile disponibile și funcționalitățile lor.

3. **Colectare Date Senzori:**
   - Asigură-te că codul încorporat bazat pe Arduino este încărcat și configurat corect pentru a colecta datele senzorilor și a le expune către endpointurile backend definite.

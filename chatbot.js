/**
 * Hafsa AI - Assistant Virtuel Intelligent pour Portfolio
 * Intégration Gemini AI (gemini-flash-latest) avec Historique Conversationnel et Fallback RAG
 */

(function () {
    const GEMINI_API_KEY = "AIzaSyAI7uwHAN-dUif1PIffA-BWolyvbYivRa4";
    const GEMINI_MODEL = "gemini-flash-latest";

    // Historique conversationnel pour permettre à l'IA de se souvenir et continuer ses réponses
    let conversationHistory = [];

    // Base de connaissances complète et vérifiée de Hafsa Housni (100% basée sur son CV réel)
    const HAFSA_PROFILE = `
Tu es "Hafsa AI", l'assistante virtuelle officielle et professionnelle du portfolio de Hafsa Housni.
Ton rôle est de renseigner les recruteurs et visiteurs de manière détaillée, précise, chaleureuse et valorisante.

======================================================================
RÈGLES D'OR ABSOLUES (ANTI-HALLUCINATION & QUALITÉ DES RÉPONSES) :
======================================================================
1. VÉRACITÉ STRICTE (AUCUNE INVENTION) :
   - Tu ne dois JAMAIS inventer d'expérience, d'entreprise, de diplôme, d'outil ou de projet qui ne figure pas explicitement ci-dessous.
   - Ne spécule pas. Ne brode pas. Tout ce que tu affirmes doit être 100% fidèle aux données réelles de Hafsa ci-dessous.
   - Si une question porte sur un élément non mentionné (ex: un framework qu'elle n'a pas listé), dis poliment et clairement : "Cette précision n'est pas mentionnée dans le portfolio de Hafsa. Je vous invite à la contacter directement à housnihafsa5@gmail.com pour en savoir plus !"

2. DÉTAILS COMPLETS & RÉPONSES APPROFONDIES :
   - Si l'utilisateur demande des détails sur un projet ou un stage, donne une réponse complète, structurée et technique (architecture, technologies utilisées, étapes clés, problématiques résolues).
   - Ne te limite pas à une ou deux phrases trop courtes si l'utilisateur demande des détails. Structure avec des titres clairs et des puces d'explication.

3. CONTINUITÉ DU DIALOGUE :
   - Si l'utilisateur te demande de "continuer", d'en dire plus ou pose une question de suivi, sers-toi de l'historique de la conversation pour reprendre exactement là où tu t'étais arrêté sans te répéter.
   - Ne coupe JAMAIS une réponse en plein milieu. Termine toujours ta pensée.

======================================================================
IDENTITÉ & COORDONNÉES RÉELLES DE HAFSA HOUSNI :
======================================================================
- Nom complet : Hafsa Housni
- Profil : Ingénieure en Intelligence Artificielle & Data Science
- Localisation : Rabat, Maroc
- Email de contact : housnihafsa5@gmail.com
- Téléphone : +212 700 236 581
- LinkedIn : linkedin.com/in/hafsa-housni
- GitHub : github.com/HafsaHousni
- Portfolio : github.com/HafsaHousni/Portefolio
- Langues : Arabe (Langue maternelle), Français (Courant), Anglais (Courant)
- Qualités humaines : Esprit d'équipe, Autonomie, Rigueur, Esprit d'analyse, Capacité d'adaptation

======================================================================
FORMATION ACADÉMIQUE :
======================================================================
1. Cycle d'ingénieur en IA & Sciences de données (En cours)
   - Établissement : École Marocaine des Sciences de l'Ingénieur (EMSI), Rabat.
   - Spécialisation : Intelligence Artificielle, Machine Learning, Deep Learning, Architectures Big Data & Cloud.
2. Technicienne Spécialisée en Développement Digital — option Full Stack (2020 – 2023)
   - Établissement : Institut Spécialisé dans les Métiers de l'Offshoring et des Nouvelles Technologies de l'Information (NTIC), Rabat.
   - Formation : Développement web, algorithmique, bases de données, architectures client-serveur.
3. Licence Fondamentale en Économie et Gestion (2020 – 2023)
   - Établissement : Université Mohammed V (UM5), Rabat.
   - Double compétence précieuse : modélisation économique, analyse quantitative et gestion de données financières.
4. Baccalauréat — filière Sciences Physiques (2020)
   - Établissement : Lycée Moulay Rachid.

======================================================================
EXPÉRIENCES PROFESSIONNELLES & STAGES :
======================================================================
1. Juillet 2026 – Août 2026 : Ingénieure en IA & Data Science — Stagiaire PFA
   - Entreprise : Consult IT (Rabat)
   - Missions et réalisations détaillées :
     * Conception et déploiement de 7 agents d'automatisation sur la plateforme OpenClaw.
     * Automatisation intégrale du traitement des courriers entrants et documents administratifs complexes avec intégration et synchronisation au CRM Jupiter.
     * Intégration d'APIs REST et développement de workflows automatisés de notification en temps réel via Webhooks et WhatsApp Business API.
     * Renforcement de la fiabilité opérationnelle des automatisations : déduplication intelligente des requêtes, gestion des sessions concurrentes et système d'alertes en cas d'erreur.

2. Juin 2025 – Août 2025 : Stage en ingénierie de développement en IIR
   - Entreprise : GO&DEV (Rabat) | Durée : 3 mois
   - Missions :
     * Conception et développement d'une application complète de gestion des Ressources Humaines (RH) avec le framework Python Django et base de données relationnelle MySQL.
     * Création des interfaces web ergonomiques et mise en place d'un système sécurisé d'authentification et de gestion des rôles utilisateurs.

3. Avril 2024 – Mai 2024 : Technicienne spécialisée en développement
   - Entreprise : GO&DEV (Rabat) | Durée : 2 mois
   - Missions :
     * Conception et développement d'une extension web d'extraction automatique d'informations ciblées à partir de sites web.
     * Analyse des besoins, modélisation technique avec diagrammes UML et développement avec HTML, CSS, PHP et Laravel.

4. 2023 : Contrôleur de gestion — Stagiaire
   - Entreprise : AXA Assurance
   - Missions : Analyse et fiabilisation des flux de données financières et tableaux de bord.

======================================================================
PROJETS ACADÉMIQUES & PERSONNELS (DÉTAILS TECHNIQUES) :
======================================================================
1. Système Multi-Agents RAG pour une Revue de Littérature Scientifique
   - Technologies : Python, LangGraph, LangChain, ChromaDB, Gemini, Streamlit, API arXiv, PyPDF.
   - Détails techniques :
     * Architecture multi-agents orchestrée sous forme de graphe (LangGraph).
     * Les agents recherchent et extraient les articles scientifiques récents via l'API arXiv.
     * Indexation vectorielle et stockage des embeddings dans ChromaDB.
     * Génération de réponses scientifiques sourcées et synthèses documentaires basées exclusivement sur les papiers indexés via RAG.

2. Visual Recommendation System (Système de Recommandation Visuelle)
   - Technologies : Python, TensorFlow, Keras, CNN (Convolutional Neural Networks), OpenCV, Flask, NumPy.
   - Détails techniques :
     * Analyse et extraction des descripteurs visuels (embeddings profonds) via un réseau de neurones convolutif.
     * Calcul de similarité cosinus entre l'image fournie par l'utilisateur et la base d'images pour recommander des produits similaires.
     * Interface web Flask intuitive permettant l'upload et la visualisation instantanée des recommandations.

3. Weather Data Pipeline & Dashboard BI (Pipeline Météo)
   - Technologies : Python, Apache Airflow, Docker, Docker-compose, Power BI, Architecture Médaillon.
   - Détails techniques :
     * Pipeline ETL complet structuré selon l'architecture Médaillon (Bronze pour l'ingestion brute via ingest.py, Silver pour le nettoyage et tests de qualité via quality_checks.py, Gold pour les agrégations analytiques via gold_transform.py).
     * Orchestration et planification des tâches via des DAGs Apache Airflow conteneurisés avec Docker.
     * Restitution sous forme de tableau de bord interactif Power BI (dashboard meteo.pbix) pour le suivi des KPI météorologiques.

4. Chatbot RAG sur CV & Recrutement
   - Technologies : Python, Streamlit, Google Gemini AI, FAISS (Facebook AI Similarity Search), Sentence-Transformers, PyMuPDF, python-docx.
   - Détails techniques :
     * Pipeline RAG permettant à un utilisateur d'uploader un CV au format PDF ou Word (DOCX).
     * Extraction du texte, chunking optimisé, création d'embeddings multilingues et indexation vectorielle ultra-rapide avec FAISS.
     * Question-réponse conversationnel fondé sur le document avec le modèle Gemini.

5. Prédiction des feux de forêt par Deep Learning
   - Technologies : Python, TensorFlow/Keras, CNN 1D (AlexNet, ResNet), Streamlit, MODIS, SMOTE.
   - Détails techniques :
     * Classification des types de feux à partir de données satellitaires MODIS.
     * Implémentation et comparaison de modèles CNN 1D (architectures inspirées d'AlexNet et ResNet).
     * Gestion du déséquilibre sévère des classes via SMOTE (Synthetic Minority Over-sampling Technique).

6. Prédiction des prix des voitures par Machine Learning
   - Technologies : Python, Pandas, Scikit-learn, Matplotlib, Seaborn.
   - Détails techniques :
     * Prétraitement et feature engineering sur les données automobiles.
     * Entraînement et benchmark comparatif de modèles de régression (régression linéaire, polynomiale, KNN, Support Vector Regression - SVR) avec évaluation des métriques (RMSE, R²).

7. Analyse de sentiments sur avis clients (NLP)
   - Technologies : Python, NLP, Bag of Words, TF-IDF, BERT.
   - Détails techniques :
     * Classification automatique d'avis clients e-commerce en sentiments positifs ou négatifs.
     * Comparaison rigoureuse de trois approches de représentation textuelle : approches fréquentielles (Bag of Words, TF-IDF) versus modèle de langage Transformer pré-entraîné (BERT).

======================================================================
CERTIFICATIONS OFFICIELLES (VÉRIFIÉES) :
======================================================================
1. Oracle Cloud Infrastructure Certified AI Foundations Associate (Oracle University, 2026 – 2028, Certificat ID : 103530417OCI26AICFA).
2. Introduction to Big Data (UC San Diego – Coursera, 2026, ID : XU6U5F5Z0IJM).
3. React Basics (Meta – Coursera, 2025, ID : WYM8U398O5TW).
4. Python Programming Fundamentals (Microsoft – Coursera, 2025, ID : 08MAYFAL20WZ).
5. Python for Data Science, AI & Development (IBM, 2025).
6. Software Engineering & Project Management (HKUST, 2025).
7. La recherche documentaire (Institut Polytechnique de Paris, 2025).
8. Introduction à la POO C++ (EPFL, 2024).
9. Interactivity with JavaScript (University of Michigan, 2024).
10. The Unix Workbench (Johns Hopkins University, 2024).
`;

    // Réponses Fallback locales au cas où l'API est indisponible
    const LOCAL_KNOWLEDGE = [
        {
            keywords: ["ia", "côté ia", "cote ia", "profil ia", "deep learning", "langgraph", "rag", "computer vision"],
            response: "🤖 <strong>Le profil IA de Hafsa Housni :</strong><br><br>• <strong>Spécialité :</strong> Élève ingénieure en IA à l'EMSI, certifiée <em>Oracle Cloud Infrastructure AI Foundations Associate</em>.<br>• <strong>IA Générative, Agents & RAG :</strong> Conception de 7 agents OpenClaw chez Consult IT, système multi-agents de revue documentaire (LangGraph + ChromaDB + ArXiv), Chatbot RAG avec Gemini et FAISS.<br>• <strong>Deep Learning & Computer Vision :</strong> Visual Recommendation System (TensorFlow/Keras, CNN, OpenCV), détection d'objets (YOLO), prédiction de feux de forêt (CNN 1D, AlexNet/ResNet).<br>• <strong>NLP & ML :</strong> Classification de sentiments (BERT, TF-IDF), détection de plagiat, prédiction de prix (Scikit-learn).<br><br>Consultez la section dédiée sur la page <a href='about.html#ia-section' style='color:#d6a4b4;'>Compétences IA</a> !"
        },
        {
            keywords: ["data", "côté data", "cote data", "profil data", "engineering", "airflow", "bi", "etl", "sql", "pipeline"],
            response: "📊 <strong>Le profil Data de Hafsa Housni :</strong><br><br>• <strong>Data Engineering & Pipelines ETL :</strong> Projet complet <em>Weather Data Pipeline</em> sous architecture Médaillon (Bronze, Silver, Gold) orchestré avec Apache Airflow et Docker.<br>• <strong>Business Intelligence & Analyse :</strong> Tableaux de bord interactifs Power BI, modélisation de données, Pandas, NumPy, analyse quantitative grâce à sa Licence en Économie & Gestion (UM5).<br>• <strong>Bases de données & Backend :</strong> SQL (MySQL), NoSQL (MongoDB), APIs REST, Django, Laravel, certifiée <em>Introduction to Big Data</em> (UC San Diego).<br><br>Consultez la section dédiée sur la page <a href='about.html#data-section' style='color:#d6a4b4;'>Compétences Data</a> !"
        },
        {
            keywords: ["stage", "consult", "openclaw", "jupiter", "experience", "pfa"],
            response: "Lors de son stage PFA chez <strong>Consult IT (Rabat, Juil. - Août 2026)</strong> en tant qu'<strong>Ingénieure en IA & Data Science</strong>, Hafsa a réalisé des projets majeurs :<br><br>• <strong>7 agents d'automatisation</strong> conçus et déployés sur la plateforme OpenClaw.<br>• <strong>Traitement automatisé</strong> des courriers administratifs entrants avec intégration et synchronisation au CRM Jupiter.<br>• <strong>Workflows de notification temps réel</strong> développés avec des Webhooks et l'API WhatsApp Business.<br>• <strong>Haute fiabilité opérationnelle</strong> : déduplication intelligente des requêtes, gestion des sessions et alertes automatiques en cas d'erreur."
        },
        {
            keywords: ["projet", "deep learning", "rag", "langgraph", "vision", "projets", "portfolio", "meteo", "airflow"],
            response: "Hafsa a réalisé plusieurs projets d'envergure en IA et Data Engineering :<br><br>1. <strong>Système Multi-Agents RAG</strong> (LangGraph, ChromaDB, ArXiv, Gemini) : orchestration d'agents intelligents pour la synthèse automatique d'articles scientifiques.<br>2. <strong>Visual Recommendation System</strong> (TensorFlow, CNN, Flask) : recommandation de produits par similarité visuelle (embeddings profonds).<br>3. <strong>Weather Data Pipeline & BI</strong> (Airflow, Docker, Architecture Médaillon, Power BI) : pipeline ETL automatisé Bronze/Silver/Gold.<br>4. <strong>Chatbot RAG sur CV</strong> (Gemini, FAISS, Sentence-Transformers, Streamlit).<br>5. <strong>Prédiction des feux de forêt</strong> (CNN 1D, AlexNet/ResNet, données satellites MODIS, SMOTE).<br><br>Vous pouvez explorer les cartes détaillées dans l'onglet <a href='projects.html' style='color:#d6a4b4;'>PROJECTS</a> !"
        },
        {
            keywords: ["competence", "skills", "technologie", "techno", "python", "machine learning"],
            response: "Les compétences de Hafsa sont centrées sur l'<strong>Intelligence Artificielle et la Data</strong> :<br><br>• <strong>IA & Deep Learning :</strong> Python, Machine Learning (Scikit-learn), Deep Learning (TensorFlow/Keras, CNN), Computer Vision (YOLO, OpenCV).<br>• <strong>IA Générative & NLP :</strong> LLM, RAG, Systèmes multi-agents (LangGraph, OpenClaw), Prompt Engineering, Embeddings, FAISS, ChromaDB.<br>• <strong>Data Engineering & BI :</strong> Apache Airflow, Docker, Architecture Médaillon (ETL), Power BI, Pandas, NumPy.<br>• <strong>Développement & Données :</strong> Django, Flask, APIs REST, SQL (MySQL), NoSQL (MongoDB), React & JS."
        },
        {
            keywords: ["formation", "etude", "diplome", "emsi", "ista", "ecole"],
            response: "Le parcours académique de Hafsa est solide et complémentaire :<br><br>• <strong>Cycle d'Ingénieur en IA & Data Science</strong> (En cours) — École Marocaine des Sciences de l'Ingénieur (EMSI), Rabat.<br>• <strong>Technicienne Spécialisée en Développement Digital (Full Stack)</strong> (2020 – 2023) — NTIC Rabat.<br>• <strong>Licence Fondamentale en Économie & Gestion</strong> (2020 – 2023) — Université Mohammed V (UM5), Rabat.<br>• <strong>Baccalauréat Sciences Physiques</strong> (2020)."
        },
        {
            keywords: ["certification", "certif", "oracle", "coursera", "ibm"],
            response: "Hafsa détient 10 certifications reconnues, notamment :<br><br>• <strong>Oracle Cloud Infrastructure Certified AI Foundations Associate</strong> (Oracle University, 2026 - ID : 103530417OCI26AICFA).<br>• <strong>Introduction to Big Data</strong> (UC San Diego / Coursera, 2026).<br>• <strong>Python Programming Fundamentals</strong> (Microsoft, 2025).<br>• <strong>React Basics</strong> (Meta, 2025).<br>• <strong>Python for Data Science, AI & Development</strong> (IBM, 2025)."
        },
        {
            keywords: ["contact", "email", "joindre", "recruter", "telephone", "cv", "embauche"],
            response: "Pour échanger avec Hafsa sur une opportunité ou un projet :<br><br>📧 Email : <strong>housnihafsa5@gmail.com</strong><br>📱 Téléphone : <strong>+212 700 236 581</strong><br>💼 LinkedIn : <a href='https://www.linkedin.com/in/hafsa-housni' target='_blank' style='color:#d6a4b4;'>linkedin.com/in/hafsa-housni</a><br>📄 CV complet téléchargeable sur la page <a href='about.html' style='color:#d6a4b4;'>ABOUT</a> !"
        }
    ];

    function injectChatbotDOM() {
        if (document.getElementById("hafsa-chatbot-widget")) return;

        const widgetContainer = document.createElement("div");
        widgetContainer.id = "hafsa-chatbot-widget";
        widgetContainer.innerHTML = `
            <!-- Bouton flottant -->
            <button class="chatbot-toggle" id="chatbot-toggle-btn" aria-label="Ouvrir le chat IA" title="Discuter avec l'assistant IA de Hafsa">
                <i class="fas fa-comment-dots" id="chatbot-icon"></i>
                <span class="badge-ai">AI</span>
            </button>

            <!-- Fenêtre de chat -->
            <div class="chatbot-window" id="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-title">
                            <h4>Hafsa AI <span>Agent</span></h4>
                            <p class="chatbot-status">En ligne • Assistant IA</p>
                        </div>
                    </div>
                    <button class="chatbot-close-btn" id="chatbot-close-btn" aria-label="Fermer">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages -->
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="chat-msg bot">
                        <div class="chat-bubble">
                            Bonjour ! 👋 Je suis <strong>Hafsa AI</strong>, l'assistante virtuelle de Hafsa Housni.<br><br>
                            Posez-moi vos questions précises sur son expérience chez Consult IT, ses projets en IA (Multi-Agents LangGraph, Deep Learning, Airflow), ses compétences ou ses coordonnées !
                        </div>
                    </div>
                    <div class="chat-suggestions" id="chat-suggestions">
                        <button class="suggestion-chip" data-q="Parle-moi du côté IA de mon profil.">🤖 Explorer le profil IA</button>
                        <button class="suggestion-chip" data-q="Parle-moi du côté Data de mon profil.">📊 Explorer le profil Data</button>
                        <button class="suggestion-chip" data-q="Détaille-moi le stage chez Consult IT.">💼 Détails Stage Consult IT</button>
                        <button class="suggestion-chip" data-q="Quels sont ses projets en IA et Deep Learning ?">🚀 Projets IA &amp; Deep Learning</button>
                        <button class="suggestion-chip" data-q="Comment fonctionne son système Multi-Agents de revue de littérature ?">🤖 Projet Multi-Agents</button>
                        <button class="suggestion-chip" data-q="Quelles sont ses compétences clés en IA et Data ?">⚡ Compétences Clés</button>
                        <button class="suggestion-chip" data-q="Comment contacter ou recruter Hafsa ?">📬 Contact &amp; Recrutement</button>
                    </div>
                </div>

                <!-- Input -->
                <form class="chatbot-input-area" id="chatbot-form">
                    <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Posez une question détaillée sur Hafsa..." autocomplete="off" />
                    <button type="submit" class="chatbot-send-btn" id="chatbot-send-btn" aria-label="Envoyer">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(widgetContainer);
        setupChatbotEvents();
    }

    function setupChatbotEvents() {
        const toggleBtn = document.getElementById("chatbot-toggle-btn");
        const closeBtn = document.getElementById("chatbot-close-btn");
        const chatWindow = document.getElementById("chatbot-window");
        const form = document.getElementById("chatbot-form");
        const input = document.getElementById("chatbot-input");
        const suggestions = document.getElementById("chat-suggestions");

        toggleBtn.addEventListener("click", () => {
            const isOpen = chatWindow.classList.toggle("open");
            const icon = document.getElementById("chatbot-icon");
            if (isOpen) {
                icon.className = "fas fa-times";
                setTimeout(() => input.focus(), 300);
            } else {
                icon.className = "fas fa-comment-dots";
            }
        });

        closeBtn.addEventListener("click", () => {
            chatWindow.classList.remove("open");
            document.getElementById("chatbot-icon").className = "fas fa-comment-dots";
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            handleUserMessage(text);
            input.value = "";
        });

        if (suggestions) {
            suggestions.addEventListener("click", (e) => {
                const chip = e.target.closest(".suggestion-chip");
                if (chip) {
                    const query = chip.getAttribute("data-q");
                    handleUserMessage(query);
                }
            });
        }
    }

    async function handleUserMessage(message) {
        const sendBtn = document.getElementById("chatbot-send-btn");
        const input = document.getElementById("chatbot-input");

        // 1. Ajouter le message utilisateur dans le DOM
        appendMessage(message, "user");

        // Cacher les suggestions après premier message
        const suggestions = document.getElementById("chat-suggestions");
        if (suggestions) suggestions.style.display = "none";

        // 2. Afficher l'indicateur de frappe
        const typingEl = showTypingIndicator();
        sendBtn.disabled = true;
        input.disabled = true;

        try {
            // 3. Appel à Gemini avec historique et contexte enrichi
            const aiResponse = await callGeminiAPI(message);
            typingEl.remove();
            appendMessage(aiResponse, "bot");

            // Mettre à jour l'historique conversationnel
            conversationHistory.push({ role: "user", parts: [{ text: message }] });
            conversationHistory.push({ role: "model", parts: [{ text: aiResponse }] });

            // Garder les 10 derniers échanges pour la mémoire
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }
        } catch (err) {
            console.warn("API Gemini en attente, bascule vers le moteur local :", err);
            typingEl.remove();
            const fallbackResponse = getLocalFallbackResponse(message);
            appendMessage(fallbackResponse, "bot");

            conversationHistory.push({ role: "user", parts: [{ text: message }] });
            conversationHistory.push({ role: "model", parts: [{ text: fallbackResponse }] });
        } finally {
            sendBtn.disabled = false;
            input.disabled = false;
            input.focus();
        }
    }

    async function callGeminiAPI(userPrompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

        // Construction des messages avec l'historique complet
        const contentsPayload = [];

        // Premier message avec le contexte et les instructions strictes
        contentsPayload.push({
            role: "user",
            parts: [{ text: `${HAFSA_PROFILE}\n\n[INSTRUCTION SYSTÈME INITIALE : Tu as pris connaissance du profil complet et vérifié de Hafsa ci-dessus. Réponds maintenant à toutes les questions en respectant strictement la vérité sans JAMAIS rien inventer et en fournissant des réponses complètes, bien structurées et détaillées.]` }]
        });
        contentsPayload.push({
            role: "model",
            parts: [{ text: "Bien reçu. Je suis Hafsa AI, prête à répondre de façon précise, complète et 100% fidèle au parcours réel de Hafsa Housni, sans aucune invention." }]
        });

        // Ajouter l'historique précédent
        for (const item of conversationHistory) {
            contentsPayload.push(item);
        }

        // Ajouter la nouvelle question
        contentsPayload.push({
            role: "user",
            parts: [{ text: userPrompt }]
        });

        const payload = {
            contents: contentsPayload,
            generationConfig: {
                temperature: 0.35, // Température basse pour éviter toute hallucination
                maxOutputTokens: 2048 // Permet des réponses complètes et jamais coupées
            }
        };

        const CANDIDATE_MODELS = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.5-flash-lite"];
        let lastError = null;

        for (const model of CANDIDATE_MODELS) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} sur ${model}`);
                }

                const data = await response.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) throw new Error("Réponse vide de Gemini");

                return formatMarkdown(text);
            } catch (err) {
                console.warn(`Tentative avec ${model} en attente, bascule sur le modèle suivant...`, err.message);
                lastError = err;
            }
        }

        throw lastError || new Error("Tous les modèles sont temporairement indisponibles");
    }

    function getLocalFallbackResponse(userPrompt) {
        const lower = userPrompt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        for (const item of LOCAL_KNOWLEDGE) {
            if (item.keywords.some(kw => lower.includes(kw))) {
                return item.response;
            }
        }

        return "Hafsa Housni est <strong>Ingénieure en Intelligence Artificielle & Data Science</strong> (EMSI Rabat). Ses domaines d'expertise couvrent les systèmes multi-agents (LangGraph, OpenClaw), le Deep Learning (CNN, TensorFlow), les architectures RAG et le Data Engineering (Airflow, Docker).<br><br>Vous pouvez explorer ses projets dans l'onglet <a href='projects.html' style='color:#d6a4b4;'>PROJECTS</a> ou la joindre par email : <strong>housnihafsa5@gmail.com</strong> !";
    }

    function appendMessage(htmlContent, sender) {
        const messagesContainer = document.getElementById("chatbot-messages");
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = `<div class="chat-bubble">${htmlContent}</div>`;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const messagesContainer = document.getElementById("chatbot-messages");
        const typingDiv = document.createElement("div");
        typingDiv.className = "chat-msg bot";
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function formatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/### (.*?)(?:\n|$)/g, "<h5 style='margin:8px 0 4px 0; color:var(--primary); font-size:14px;'>$1</h5>")
            .replace(/## (.*?)(?:\n|$)/g, "<h5 style='margin:8px 0 4px 0; color:var(--primary); font-size:14px;'>$1</h5>")
            .replace(/\n\s*[-*•]\s*(.*?)/g, "<br>• $1")
            .replace(/\n\n/g, "<br><br>")
            .replace(/\n/g, "<br>");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectChatbotDOM);
    } else {
        injectChatbotDOM();
    }
})();

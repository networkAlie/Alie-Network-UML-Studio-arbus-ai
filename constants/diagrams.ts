import { Diagram } from '../types';

// Shared class for exception/risk nodes
const CLASSDEF = "classDef ex fill:#fecaca,stroke:#dc2626,color:#b91c1c;\n";

export const diagrams: Diagram[] = [
  // GROUP: Arbus AI — Growth Campaign
  {
    id: "ARB_FUNNEL",
    group: "Arbus AI — Growth Campaign",
    title: "Marketing & Sales Funnel",
    code: `graph TD
    subgraph "1. Awareness (Reach Target Audience)"
        A1["X.com (Twitter) Ads"]
        A2["Data-Driven KOL Content"]
        A3["Tech Media Articles (e.g., Cointelegraph)"]
    end
    subgraph "2. Consideration (Demonstrate Value)"
        B["arbus.ai Website"]
        B_MSG["<strong>'See with Data. Win with Intelligence.'</strong>"]
        B_DEMO["Live Product Demo Video"]
    end
    subgraph "3. Conversion (Build Trust in Tech)"
        C1("CTA: Explore Terminal for Free")
        C2["User Signs Up"]
        C3["Receives First Actionable Signal"]
    end
    subgraph "4. Loyalty (Create Power Users)"
        D1["Engage in Community (Discord/TG)"]
        D2["Upgrade to Premium Features"]
        D3["Utilize Developer API"]
    end
    
    A1 & A2 & A3 --> B -- Main Message --> B_MSG
    B --> B_DEMO
    B --> C1 --> C2 --> C3
    C3 --> D1 & D2 & D3
    `
  },
  {
    id: "ARB_ARCH",
    group: "Arbus AI — Growth Campaign",
    title: "System Architecture",
    code: `flowchart LR
    subgraph "Audiences"
        U1[Data-Driven Traders]
        U2[Web3 Developers]
    end
    
    subgraph "Traffic Channels"
        C1["X.com Ads (#AI, #DeFi)"]
        C2["KOLs (Analysis-focused)"]
        C3["Data Platforms (DEXTools)"]
        C4["Tech Media (Cointelegraph)"]
    end

    subgraph "Conversion Hub"
        WEB[arbus.ai Website]
        CTA("Free Terminal Access")
    end

    subgraph "Product Ecosystem"
        PROD["Arbus Terminal"]
        API["Developer API/SDK"]
    end
    
    U1 --> C1 & C2 & C3
    U2 --> C4
    C1 & C2 & C3 & C4 -- Traffic --> WEB
    WEB -- Signup --> PROD
    PROD -- Insights --> U1
    U2 -- Builds on --> API
    `
  },
  {
    id: "ARB_TRUST",
    group: "Arbus AI — Growth Campaign",
    title: "Trust Building Strategy",
    code: `flowchart TD
    ${CLASSDEF}    A(Core Problem: Team Anonymity / Closed Source):::ex --> B{Strategic Shift};
    B -- "From 'Trust Us' to 'Trust the Data'" --> C[Campaign Actions];
    
    subgraph C
        D["1. Offer a Free, Verifiable Product"]
        E["2. Showcase Live, Unbiased Data Signals"]
        F["3. Publish In-Depth Technical Articles"]
        G["4. Maintain a Public Product Roadmap"]
    end
    
    C --> H((Outcome: Confidence in Product Performance & Transparency));
    `
  },
  {
    id: "ARB_SEQUENCE",
    group: "Arbus AI — Growth Campaign",
    title: "User Onboarding Sequence",
    code: `sequenceDiagram
    participant User
    participant Ad as "X.com Ad"
    participant Web as "arbus.ai Website"
    participant Term as "Arbus Terminal"

    User->>Ad: Sees ad: "Filter the noise."
    Ad-->>User: Clicks on link
    User->>Web: Lands on page with demo
    Web-->>User: Clicks "Explore for Free"
    User->>Term: Signs up for an account
    Term-->>User: Delivers first insight: "Rising Trend Detected"
    Note right of User: Value is proven instantly
    `
  },
  {
    id: "ARB_CONTENT",
    group: "Arbus AI — Growth Campaign",
    title: "Content & Channel Matrix",
    code: `graph TD
    subgraph "Target: Data-Driven Traders"
        M1["Message: 'Stop guessing. Get verifiable signals.'"] --> C1["Channels: X.com Ads, DEXTools, TradingView"]
    end
    
    subgraph "Target: Web3 Developers"
        M2["Message: 'Build smarter DeFi agents with our API.'"] --> C2["Channels: Tech Media (Medium), Dev Forums"]
    end

    subgraph "Target: General Crypto Investors"
        M3["Message: 'The market is chaotic. Here’s your filter.'"] --> C3["Channels: KOL Videos, AMAs in Discord/Telegram"]
    end
    `
  },
];
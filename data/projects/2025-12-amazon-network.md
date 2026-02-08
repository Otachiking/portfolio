---
title: "DVD Amazon Co-Purchases Network Analysis"
slug: "amazon-network-analysis"
date: "2025-12-15"
category: "Data Analysis & Visualization"
project_type: "Academic Project"
thumbnail: "/images/projects/dvd_amazon_thumb.png"
excerpt: "Social Network Analysis of Amazon's DVD co-purchase patterns using NetworkX, featuring centrality metrics, clustering analysis, and an interactive web-based graph visualization."
featured: true
contributors:
  - "muhammad-iqbal-rasyid"
  - "rafi-suwargana"
  - "marcel-epafroditus"
techStack:
  - "Python"
  - "NetworkX"
  - "D3.js"
  - "Flask"
links:
  liveApp: "https://ajs-kel6.vercel.app/"
  github: "https://github.com/Otachiking/AJS_AmazonCoPurchases"
  paper: "https://drive.google.com/file/d/1LFhnabzmcn0IKO6E_Ocz1Hye2jQE8iSx/view?usp=drive_link"
tags:
  - "SocialNetworkAnalysis"
  - "NetworkX"
  - "Python"
  - "GraphTheory"
  - "DataVisualization"
  - "CommunityDetection"
  - "RecommendationSystems"
  - "InteractiveWebApp"
sections:
  - type: "overview"
    content: |
      This academic project explored purchasing relationship patterns within Amazon's Co-Purchases dataset, with a specific focus on the DVD product category. Using Social Network Analysis (SNA) methods, we investigated how products relate to each other through customer purchasing behavior—essentially mapping the "customers who bought this also bought that" relationships as a network graph.

      The project applied graph theory concepts including centrality measures, clustering coefficients, and community detection to uncover hidden patterns in product relationships. The findings were presented through an interactive web-based graph simulation that allows users to explore product connections and understand recommendation insights visually.

  - type: "demo"
    title: "Interactive Graph Explorer"
    url: "https://ajs-kel6.vercel.app/"

  - type: "process"
    content: |
      **Dataset Preparation**
      Started with the Stanford SNAP Amazon Co-Purchasing Network dataset, which contains:
      - 548,552 products with metadata (title, category, sales rank)
      - 1,788,725 co-purchase edges (product A frequently bought with product B)

      Filtered the dataset to DVD category only, resulting in:
      - 19,828 DVD products as nodes
      - 78,432 co-purchase relationships as edges

      **Network Construction**
      Built the network graph using Python NetworkX:
      - Nodes represent individual DVD products
      - Edges represent co-purchase relationships
      - Edge weights derived from frequency of co-occurrence
      - Added node attributes: title, sales rank, release year

      **Centrality Analysis**
      Computed multiple centrality metrics to identify influential products:
      
      **Degree Centrality**: Products with most direct connections (popular items frequently bought with others)
      - Top result: "The Lord of the Rings Trilogy" (connected to 847 other DVDs)
      
      **Betweenness Centrality**: Products that bridge different clusters (gateway products)
      - Finding: Classic films often bridge genre clusters
      
      **PageRank**: Importance based on being connected to other important products
      - Identified "hidden gems" with high PageRank but low sales rank

      **Clustering & Community Detection**
      Applied Louvain community detection algorithm to identify product clusters:
      - Discovered 23 distinct communities
      - Communities corresponded well to genres (Action, Comedy, Drama, etc.)
      - Some unexpected clusters: "90s Nostalgia" grouping across genres
      - Identified cross-genre bridge products ideal for recommendation diversification

      **Information Diffusion Simulation**
      Modeled how a "trend" might spread through the network:
      - Used Independent Cascade model
      - Simulated viral DVD releases and their ripple effects
      - Identified optimal seed products for maximum reach

  - type: "gallery"
    images:
      - src: "/images/projects/amazon-full-graph.jpg"
        alt: "Full network visualization of DVD co-purchases"
        caption: "Complete DVD co-purchase network (19,828 nodes)"
      - src: "/images/projects/amazon-communities.jpg"
        alt: "Community detection results with color-coded clusters"
        caption: "23 communities detected via Louvain algorithm"
      - src: "/images/projects/amazon-centrality.jpg"
        alt: "Centrality analysis visualization"
        caption: "Node size scaled by PageRank importance"
      - src: "/images/projects/amazon-webapp.jpg"
        alt: "Interactive web application interface"
        caption: "Web-based explorer with search and filtering"

---

---
title: "DVD Amazon Co-Purchases Network Analysis"
slug: "amazon-network-analysis"
date: "2025-12-01"
category: "AI/ML & Data"
project_type: "Academic Project"
thumbnail: "/images/projects/amazon-network-thumb.jpg"
excerpt: "Social Network Analysis of Amazon's DVD co-purchase patterns using NetworkX, featuring centrality metrics, clustering analysis, and an interactive web-based graph visualization."
featured: true
contributors:
  - "muhammad-iqbal-rasyid"
  - "falah-akbar"
  - "sara-nur"
techStack:
  - "Python"
  - "NetworkX"
  - "D3.js"
  - "Flask"
links:
  liveApp: "https://amazon-network-viz.vercel.app"
  video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  github: "https://github.com/iqbalrasyid/amazon-network"
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

  - type: "video"
    title: "Video"
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

  - type: "demo"
    title: "Interactive Graph Explorer"
    url: "https://amazon-network-viz.vercel.app"

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

  - type: "outcome"
    metrics:
      - name: "Nodes Analyzed"
        value: "19.8K"
      - name: "Edges Mapped"
        value: "78.4K"
      - name: "Communities Found"
        value: "23"
      - name: "Avg. Clustering"
        value: "0.42"
    content: |
      The network analysis revealed several actionable insights for recommendation system design:

      **Structural Findings:**
      - The DVD network exhibits small-world properties (avg. path length: 4.2 hops)
      - High clustering coefficient (0.42) indicates strong genre-based groupings
      - Power-law degree distribution confirms presence of "hub" products

      **Recommendation Insights:**
      - Traditional collaborative filtering misses cross-genre opportunities
      - Betweenness-central products are ideal for recommendation diversification
      - Community-aware recommendations can balance relevance with discovery

      **Academic Outcome:**
      The project received distinction grade and was selected for presentation at the department's annual data science showcase. The interactive visualization component was particularly noted for making complex network concepts accessible.

  - type: "insights"
    content: |
      **Technical Implementation:**
      - NetworkX handles graphs up to ~100K nodes well; larger would need graph databases
      - Force-directed layouts (ForceAtlas2) create intuitive visualizations but require parameter tuning
      - Web visualization used D3.js with WebGL acceleration for smooth interaction

      **Analytical Insights:**
      - Co-purchase networks capture different information than rating-based similarity
      - Temporal analysis (when edges formed) could reveal trend prediction opportunities
      - Sales rank doesn't correlate strongly with network centrality—different value signals

      **Visualization Challenges:**
      - Full graph is too dense to visualize meaningfully—implemented zoom-based detail levels
      - Color-coding 23 communities required careful palette selection for distinguishability
      - Added search functionality as users wanted to find specific products

      **Future Research Directions:**
      - Extend analysis to other product categories and compare network structures
      - Incorporate temporal dynamics (edge formation over time)
      - Build actual recommendation engine using network-based features
      - Apply similar analysis to streaming service viewing patterns
---

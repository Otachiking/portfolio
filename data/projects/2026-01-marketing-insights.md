---
title: "Multi-Industry Digital Marketing Performance Analysis"
slug: "digital-marketing-insights"
date: "2026-01-20"
category: "Data & ML/AI"
project_type: "Competition"
thumbnail: "/images/projects/marketing-insights-thumb.jpg"
excerpt: "Data analysis and interactive visualization platform exploring digital marketing performance across FMCG, Beauty, and Fashion industries, featuring dynamic graphs and data-driven storytelling."
featured: true
contributors:
  - "falah-akbar"
tags:
  - "Data Analysis"
  - "Digital Marketing"
  - "Python"
  - "JavaScript"
  - "Data Visualization"
  - "Storytelling"
  - "Interactive Dashboard"
  - "Pandas"
  - "Plotly"
sections:
  - type: "overview"
    content: |
      This competition project involved analyzing digital marketing performance data across multiple clients spanning three major industries: FMCG (Fast-Moving Consumer Goods), Beauty, and Fashion. The goal was to uncover traffic and sales trends over a 12-month period and present actionable insights through an engaging, interactive platform.

      As the data analyst, I was responsible for the entire analytical pipeline—from data cleaning and exploratory analysis to building a web-based presentation platform featuring dynamic visualizations and narrative-driven insights that tell the story behind the numbers.

  - type: "demo"
    title: "Interactive Dashboard"
    url: "https://marketing-insights-demo.vercel.app"

  - type: "process"
    content: |
      **Data Acquisition & Cleaning**
      Received raw marketing data from 12 clients across 3 industries, including:
      - Daily website traffic (sessions, pageviews, bounce rate, avg. session duration)
      - Conversion funnel metrics (add-to-cart, checkout initiated, purchases)
      - Ad spend and ROAS (Return on Ad Spend) across channels (Meta, Google, TikTok)
      - Revenue and order data with product category breakdowns

      Data cleaning challenges included handling missing values, standardizing date formats across clients, and reconciling currency differences. Used Python (Pandas) for all preprocessing.

      **Exploratory Data Analysis**
      Conducted comprehensive EDA to identify patterns:
      - Seasonality analysis: Identified peak periods (Ramadan, 11.11, 12.12 sales events)
      - Channel performance comparison: Meta vs Google vs TikTok effectiveness by industry
      - Cohort analysis: Customer retention patterns across industries
      - Correlation studies: Traffic sources vs conversion rates

      **Key Findings Development**
      Synthesized analysis into 5 major insight categories:
      1. **Seasonal Sensitivity**: Fashion shows 3x higher seasonal variance than FMCG
      2. **Channel Efficiency**: TikTok emerging as top ROAS channel for Beauty (avg. 4.2x)
      3. **Traffic Quality**: Organic traffic converts 2.8x better than paid across all industries
      4. **Mobile Dominance**: 78% of Beauty traffic is mobile, requiring mobile-first strategies
      5. **Price Sensitivity**: FMCG responds strongly to discount campaigns; Fashion less so

      **Platform Development**
      Built an interactive web platform using:
      - **Backend**: Python Flask for data API endpoints
      - **Frontend**: Vanilla JavaScript with Plotly.js for interactive charts
      - **Styling**: Custom CSS with responsive design
      - **Hosting**: Deployed on Vercel for easy access during competition presentation

  - type: "gallery"
    images:
      - src: "/images/projects/marketing-overview.jpg"
        alt: "Dashboard overview showing industry comparison"
        caption: "Industry comparison dashboard with key metrics"
      - src: "/images/projects/marketing-trends.jpg"
        alt: "Time series visualization of traffic trends"
        caption: "Interactive time series with drill-down capability"
      - src: "/images/projects/marketing-channels.jpg"
        alt: "Channel performance breakdown by industry"
        caption: "Channel ROAS comparison across industries"
      - src: "/images/projects/marketing-story.jpg"
        alt: "Data storytelling section with narrative insights"
        caption: "Narrative-driven insight presentation"

  - type: "outcome"
    metrics:
      - name: "Clients Analyzed"
        value: "12"
      - name: "Data Points"
        value: "1.2M+"
      - name: "Insights Generated"
        value: "25+"
      - name: "Competition Result"
        value: "Top 5"
    content: |
      The project successfully delivered a comprehensive analysis platform that impressed competition judges with its depth of insight and innovative presentation approach. The interactive storytelling format made complex data accessible to non-technical stakeholders.

      Key deliverables included:
      - Executive summary with actionable recommendations per industry
      - Interactive dashboard with filterable views by client, industry, and time period
      - Exportable PDF reports for each client with benchmarking against industry averages
      - Presentation deck with data-driven narratives for the final pitch

      The project placed in the Top 5 among 40+ competing teams, with judges particularly noting the quality of data visualization and the storytelling approach to presenting insights.

  - type: "insights"
    content: |
      **Analytical Approach:**
      - Started with hypothesis-driven analysis but remained open to unexpected findings
      - Used statistical significance testing to validate trends before presenting as insights
      - Created industry-specific benchmarks rather than one-size-fits-all metrics

      **Visualization Philosophy:**
      - Every chart should answer a specific question—removed decorative visualizations
      - Implemented progressive disclosure: overview first, then details on demand
      - Used consistent color coding across all visualizations for cognitive ease

      **Technical Decisions:**
      - Chose Plotly.js over D3.js for faster development with acceptable customization
      - Built API endpoints to enable real-time data updates during presentation
      - Implemented lazy loading for performance with large datasets

      **Lessons for Future Projects:**
      - Data quality issues consume 60% of project time—budget accordingly
      - Stakeholder feedback early saves significant rework later
      - Interactive presentations are far more engaging than static slides
---

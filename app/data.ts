export const PROFILE = {
  name: 'Aniket Deshpande',
  title: 'AI Engineer · MSc AI & Robotics · Working Student Gen AI @ Allianz',
  tagline: 'Turning AI ideas into shipped features.',
  email: 'deshpandeaniket8055@gmail.com',
  linkedin: 'https://linkedin.com/in/deshpandeaniket8055',
  github: 'https://github.com/AniketDeshpande-23',
  summary:
    'I specialise in turning GenAI ideas into working features that teams can try, measure, and iterate on. In industry projects I\'ve built RAG flows, evaluation scripts, and full-stack interfaces that let non-technical stakeholders interact with LLMs and give feedback. My academic work on multi-agent vs single-LLM approaches gives me a good sense of what is hype and what actually improves reliability, latency, or accuracy. I\'m looking for a junior role where I can collaborate closely with product and engineering to ship AI capabilities that make a visible difference to users.',
}

export const EXPERIENCE = [
  {
    company: 'Allianz SE',
    role: 'Working Student – Gen AI & Transformation Adoption',
    period: 'May 2026 – Present',
    location: 'Germany',
    bullets: [
      'Evaluating enterprise LLM tools and Gen AI platforms for internal adoption.',
      'Building proof-of-concept AI applications to demonstrate business value.',
      'Supporting change management: stakeholder engagement and AI enablement.',
      'Contributing to Gen AI transformation strategy and use-case prioritisation.',
    ],
    current: true,
  },
  {
    company: 'Synaptris Solutions PVT LTD',
    role: 'Trainee Engineer – IT Support',
    period: 'Jan 2023 – Feb 2024',
    location: 'Chennai, India',
    bullets: [
      'Automated SQL queries to improve data quality for ML projects.',
      'Resolved 300+ tickets for US clients with 98% satisfaction rate.',
      'Contributed to internal case studies supporting training & data pipelines.',
    ],
    current: false,
  },
  {
    company: 'Assetrak Solutions PVT LTD',
    role: 'Business Operations & Content Writer',
    period: 'Apr 2022 – Sep 2022',
    location: 'Pune, India',
    bullets: [
      'Authored 15+ technical blogs and product documents.',
      'Improved communication between dev teams and business stakeholders.',
    ],
    current: false,
  },
]

export const PROJECTS = [
  {
    title: 'AI Support Agent',
    period: 'May 2026',
    stack: ['Python', 'FastAPI', 'React', 'LangChain', 'FAISS', 'Docker'],
    github: 'https://github.com/AniketDeshpande-23/ai-support-agent',
    demo: null,
    metric: 'Production deployed',
    bullets: [
      'Full-stack RAG pipeline: React dashboard + FastAPI backend.',
      'Multi-model routing — local Qwen + cloud GPT fallback for cost control.',
      'Docker deployment with automated evaluation harness and benchmarking.',
    ],
  },
  {
    title: 'KRAFT 2.0 – Agentic AI Thesis Assistant',
    period: 'May 2026',
    stack: ['Python', 'FastAPI', 'LangGraph', 'arXiv API', 'Semantic Scholar', 'Perplexity', 'Docker', 'SSE'],
    github: 'https://github.com/AniketDeshpande-23/kraft-agentic-ai',
    demo: null,
    metric: '$0.006 per full literature review',
    bullets: [
      '5-agent pipeline: Planner → Researcher → Analyst → Writer → Critic orchestrated via LangGraph.',
      'Parallel searches across arXiv, Semantic Scholar, and Perplexity with live web synthesis.',
      'Outputs APA-formatted thematic literature reviews with hallucination-checked citations.',
      'Local Ollama fallback — works fully offline; Docker + SSE streaming backend.',
    ],
  },
  {
    title: 'Automobile Manufacturing Defect Detection',
    period: '2025',
    stack: ['Python', 'PyTorch', 'EfficientNet-B0', 'Grad-CAM', 'ONNX', 'Jupyter'],
    github: 'https://github.com/AniketDeshpande-23/Automobile-Manufactoring-Defect-detection',
    demo: null,
    metric: '6-class steel defect detection',
    bullets: [
      'Classifies 6 automotive steel surface defect types using EfficientNet-B0 transfer learning.',
      'Grad-CAM heatmaps pinpoint exact defect location for production line routing decisions.',
      'Trained on NEU Steel Surface Defect DB (1,800 balanced images); ONNX export for edge deployment.',
    ],
  },
  {
    title: 'Image Classification – CNN & Transformer Architectures',
    period: '2024',
    stack: ['Python', 'PyTorch', 'TIMM', 'ViT', 'Swin Transformer', 'ConvNeXt', 'Jupyter'],
    github: 'https://github.com/AniketDeshpande-23/ImageClassification-Models-CNN-and-Transformer-Architectures',
    demo: null,
    metric: '5 architectures benchmarked',
    bullets: [
      'Implemented and benchmarked CNN → ConvNeXt → ViT → Swin Transformer evolution.',
      'Transfer learning with pretrained weights; fine-tuning, augmentation, and metric visualisation.',
      'Practical reference comparing classical vs. attention-based CV architectures.',
    ],
  },
  {
    title: 'RAG Demo – Enterprise Q&A',
    period: 'Mar – Apr 2025',
    stack: ['Python', 'Hugging Face', 'LangChain', 'FAISS', 'Haystack', 'Streamlit'],
    github: 'https://github.com/AniketDeshpande-23/Fleetinsight-ai-RAG-Tool-',
    demo: null,
    metric: '+25% accuracy vs baseline',
    bullets: [
      'LLM-based RAG pipeline for company-specific Q&A using Hugging Face models.',
      'MiniLM-L6-v2 embeddings + FAISS semantic search.',
      'Demonstrated potential for logistics & supply chain document automation.',
    ],
  },
  {
    title: 'Quality Inspection – NiryoNed2',
    period: 'Oct 2024 – Feb 2025',
    stack: ['Python', 'YOLOv5', 'OpenCV', 'PyTorch', 'ROS', 'Jetson Nano'],
    github: 'https://github.com/AniketDeshpande-23/Quality-Inspection-using-Niryo',
    demo: null,
    metric: '95% accuracy · <50ms inference',
    bullets: [
      'Custom dataset creation and annotation for defective bottle detection.',
      'Fine-tuned YOLOv5; deployed on Jetson Nano at <50ms inference speed.',
      'Integrated with ROS-based robotic control via OpenCV preprocessing.',
    ],
  },
  {
    title: 'NaO Robot Home Assistant',
    period: 'Apr – Jul 2024',
    stack: ['Python', 'NAOqi', 'OpenCV', 'WSL'],
    github: 'https://github.com/AniketDeshpande-23',
    demo: null,
    metric: '>90% speech accuracy',
    bullets: [
      'Voice command system with >90% recognition accuracy.',
      'Object detection & gesture-based interaction; 30+ hours field testing.',
    ],
  },
  {
    title: 'Simulation Environments – Gazebo vs Isaac Sim',
    period: 'Apr – Jun 2024',
    stack: ['ROS', 'Gazebo', 'Nvidia Isaac Sim', 'Python'],
    github: 'https://github.com/AniketDeshpande-23',
    demo: null,
    metric: '40% latency reduction',
    bullets: [
      'Two robotic pick-and-place simulations with benchmark comparison.',
      '40% latency reduction via PID tuning; co-authored comparative research paper.',
    ],
  },
  {
    title: 'Low-Cost Robotic Arm',
    period: 'Jun 2021 – Mar 2022',
    stack: ['Python', 'Arduino', 'OpenCV', 'Bluetooth'],
    github: 'https://github.com/AniketDeshpande-23',
    demo: null,
    metric: '70% cheaper than alternatives',
    bullets: [
      '3D-printed arm with voice, gesture, and slider control modes.',
      '70% cheaper than comparable market products; presented at 3+ seminars.',
    ],
  },
]

export const SKILLS = [
  { category: 'LLMs & NLP', items: ['LangChain', 'RAG', 'FAISS', 'Hugging Face', 'Fine-tuning', 'Prompt Engineering'] },
  { category: 'ML / DL', items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'YOLOv5'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'SQL', 'REST APIs'] },
  { category: 'Deployment', items: ['Docker', 'Jetson Nano', 'Linux', 'Shell scripting', 'Git'] },
  { category: 'Computer Vision', items: ['OpenCV', 'YOLOv5', 'Image annotation'] },
  { category: 'Robotics', items: ['ROS', 'Gazebo', 'Isaac Sim', 'NAOqi'] },
  { category: 'Tools', items: ['VS Code', 'Jupyter', 'Colab', 'n8n', 'Hugging Face Hub'] },
]

export const PAPERS = [
  { title: 'Recent Advancements in Image Classification', desc: 'Surveyed modern classification techniques for industrial applications.' },
  { title: 'Business Analytics and Big Data in Manufacturing', desc: 'Explored data-driven decision-making for production and logistics optimisation.' },
  { title: 'Simulation Environments for Training Robots – Nvidia Isaac vs. Gazebo', desc: 'Compared robotic training environments for scalability and cost-efficiency.' },
  { title: 'Augmented and Virtual Reality in Industrial Environments', desc: 'Evaluated immersive technologies for workforce training and process visualisation.' },
]

export const CERTS = [
  { name: 'Foundations of AI and Machine Learning', issuer: 'Microsoft – Coursera' },
  { name: 'Open-Source Models with Hugging Face', issuer: 'Hugging Face' },
  { name: 'AI Python for Beginners', issuer: 'DeepLearning.AI' },
  { name: 'Microsoft SQL Server Masterclass', issuer: 'Udemy' },
]

const pageConfig = {
    sections: {
        header: {
            enabled: true,
            title: "Retrieval Dexterity: Efficient Object Retrieval in Clutters with Dexterous Hand",
            authors: [
                {
                    name: "Fengshuo Bai",
                    link: "https://Changwinde.github.io/",
                    isEqualContribution: false
                },
                {
                    name: "Yu Li",
                    link: "https://github.com/Student-of-Holmes",
                    isEqualContribution: false
                },
                {
                    name: "Jie Chu",
                    link: "https://bxzzcj.github.io/",
                    isEqualContribution: false
                },
                {
                    name: "Tawei Chou",
                    link: "https://openreview.net/profile?id=~Tawei_Chou1",
                    isEqualContribution: false
                },
                {
                    name: "Runchuan Zhu",
                    link: "https://github.com/Zrc007",
                    isEqualContribution: false,
                    lineBreak: true
                },
                {
                    name: "Ying Wen",
                    link: "https://yingwen.io/",
                    isEqualContribution: false
                },
                {
                    name: "Yaodong Yang",
                    link: "https://www.yangyaodong.com/",
                    isEqualContribution: false
                },
                {
                    name: "Yuanpei Chen",
                    link: "https://cypypccpy.github.io/",
                    isEqualContribution: false
                }
            ],
            institution: "Shanghai Jiao Tong University, PKU-PsiBot Joint Lab, Peking University",
            venue: "",
            links: {
                paper: {
                    enabled: true,
                    arxivId: "ARXIV PAPER ID"
                },
                supplementary: {
                    enabled: true,
                    path: "static/pdfs/supplementary_material.pdf"
                },
                github: {
                    enabled: true,
                    repo: "https://github.com/ChangWinde/RetrDex"
                }
            }
        },
        
        content: {
            teaser: {    
                enabled: true,
                video: {
                    enabled: true,
                    path: "static/videos/banner.mp4"
                },
                subtitle: {
                    enabled: true,
                    text: "Retrieval Dexterity is a general system which learns efficient object retrieval in simulation and demonstrates zero-shot real-world deployment."
                }
            },
            
            abstract: {
                enabled: true,
                text: "Retrieving objects buried beneath multiple objects is not only challenging but also time-consuming. Performing manipulation in such environments presents significant difficulty due to complex contact relationships. Existing methods typically address this task by sequentially grasping and removing each occluding object, resulting in lengthy execution times and requiring impractical grasping capabilities for every occluding object. In this paper, we present a dexterous arm-hand system for efficient object retrieval in multi-object stacked environments. Our approach leverages large-scale parallel reinforcement learning within diverse and carefully designed cluttered environments to train policies. These policies demonstrate emergent manipulation skills (e.g., pushing, stirring, and poking) that efficiently clear occluding objects to expose sufficient surface area of the target object. We conduct extensive evaluations across a set of over 10 household objects in diverse clutter configurations, demonstrating superior retrieval performance and efficiency for both trained and unseen objects. Furthermore, we successfully transfer the learned policies to a real-world dexterous multi-fingered robot system, validating their practical applicability in real-world scenarios."
            },
            
            imageCarousel: {
                enabled: true,
                images: [
                    {
                        path: "carousel1.jpg",
                        caption: "First image description1"
                    },
                    {
                        path: "carousel1.jpg",
                        caption: "Second image description2"
                    },
                    {
                        path: "carousel1.jpg",
                        caption: "Third image description3"
                    },
                    {
                        path: "carousel1.jpg",
                        caption: "Fourth image description4"
                    }
                ]
            },
            
            videoPresentation: {
                enabled: true,
                title: "Video Presentation",
                youtubeId: "JkaxUblCGz0"
            },
            
            videoCarousel: {
                enabled: true,
                title: "Additional Results",
                videos: [
                    {
                        path: "carousel1.mp4",
                        poster: "poster1.jpg"
                    },
                    {
                        path: "carousel2.mp4",
                        poster: "poster2.jpg"
                    },
                    {
                        path: "carousel3.mp4",
                        poster: "poster3.jpg"
                    }
                ]
            },
            
            poster: {
                enabled: false,
                title: "Paper Poster",
                pdfPath: "static/pdfs/sample.pdf"
            }
        },
        
        citation: {
            enabled: true,
            bibtex: `@inproceedings{author2024paper,
                        author    = {Author1 and Author2 and Author3},
                        title     = {Paper Title},
                        booktitle = {Conference Name},
                        year      = {2025}
                    }`
        },
        
        footer: {
            enabled: true
        }
    }
}; 
import { db } from "./index";
import * as schema from "@shared/schema";
import { 
  videos, 
  videoTags, 
  tags, 
  progressMetrics, 
  productionTimeline,
  qrCodes,
  animatedOutros
} from "@shared/schema";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Insert tags
    const tagData = [
      { name: "Crypto" },
      { name: "Solana" },
      { name: "Memecoin" },
      { name: "Jupiter" },
      { name: "Education" },
      { name: "Humor" }
    ];

    console.log("Seeding tags...");
    const existingTags = await db.query.tags.findMany();
    const existingTagNames = existingTags.map(tag => tag.name);
    
    const newTags = tagData.filter(tag => !existingTagNames.includes(tag.name));
    if (newTags.length > 0) {
      await db.insert(tags).values(newTags);
    }
    console.log(`Added ${newTags.length} new tags`);

    // Insert videos
    const videoData = [
      {
        title: '"What is a Memecoin?" 🤔',
        description: 'We took to the streets of Mumbai to ask people about memecoins - their reactions are priceless! Learn about the fundamentals of meme cryptocurrencies through real people\'s perspectives.',
        shortDescription: 'Street reactions that will make you LOL!',
        thumbnailUrl: 'https://images.unsplash.com/photo-1532453288353-25a86d640354?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=888',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 42,
        views: 25000,
        likes: 1200,
        location: 'Mumbai',
        videoType: 'short-form',
        featured: false
      },
      {
        title: '"Explain Solana Like I\'m 5" 👶',
        description: 'We challenged Delhi college students to explain Solana in the simplest terms possible. From hilarious analogies to surprisingly accurate explanations, this video shows the knowledge gap and enthusiasm around blockchain.',
        shortDescription: 'College students attempt the impossible!',
        thumbnailUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=888',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 58,
        views: 18000,
        likes: 950,
        location: 'Delhi',
        videoType: 'short-form',
        featured: false
      },
      {
        title: '"Would You Rather...?" 💰',
        description: 'We posed crypto dilemmas to shoppers in a Patna market. Would you rather hold Bitcoin for 10 years or get 1 SOL every day for a year? The answers reveal interesting insights about risk tolerance and crypto awareness.',
        shortDescription: 'Crypto dilemmas with hilarious twists!',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519882189396-71f93cb4714b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=888',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 37,
        views: 31000,
        likes: 1450,
        location: 'Patna',
        videoType: 'short-form',
        featured: false
      },
      {
        title: 'The Best of Jupiter Jams: Pan-India Edition',
        description: 'A hilarious journey through India exploring crypto knowledge, memes, and Jupiter\'s solutions. This compilation features the best moments from our street interviews across five Indian cities.',
        shortDescription: 'The ultimate compilation of our best content',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 402,
        views: 87000,
        likes: 4200,
        location: 'All India',
        videoType: 'long-form',
        featured: true
      }
    ];

    console.log("Seeding videos...");
    const existingVideos = await db.query.videos.findMany();
    const existingVideoTitles = existingVideos.map(video => video.title);
    
    for (const video of videoData) {
      if (!existingVideoTitles.includes(video.title)) {
        await db.insert(videos).values(video);
      }
    }
    console.log(`Added ${videoData.filter(video => !existingVideoTitles.includes(video.title)).length} new videos`);

    // Insert progress metrics
    const progressMetricsData = [
      {
        name: 'Video Production',
        value: '3/5',
        description: '3 short videos completed, 2 in progress',
        percentage: 60,
        color: 'teal'
      },
      {
        name: 'Engagement',
        value: '87.3K',
        description: 'Total views across all platforms',
        percentage: 75,
        color: 'orange'
      },
      {
        name: 'Conversion',
        value: '3.2%',
        description: 'QR code scan rate from videos',
        percentage: 32,
        color: 'purple'
      },
      {
        name: 'Social Shares',
        value: '1,250',
        description: 'Content reshared across platforms',
        percentage: 85,
        color: 'yellow'
      }
    ];

    console.log("Seeding progress metrics...");
    const existingMetrics = await db.query.progressMetrics.findMany();
    if (existingMetrics.length === 0) {
      await db.insert(progressMetrics).values(progressMetricsData);
      console.log(`Added ${progressMetricsData.length} progress metrics`);
    } else {
      console.log("Progress metrics already exist, skipping");
    }

    // Insert production timeline
    const productionTimelineData = [
      {
        title: 'Mumbai & Delhi Videos',
        description: 'Short-form videos from Mumbai and Delhi locations',
        status: 'completed',
        statusText: 'Completed',
        order: 1,
        tags: [
          { color: 'green', label: 'Editing Done' },
          { color: 'green', label: 'Published' }
        ]
      },
      {
        title: 'Patna Video',
        description: 'Final edits and graphics being added',
        status: 'in-progress',
        statusText: 'In Progress',
        order: 2,
        tags: [
          { color: 'yellow', label: '90% Complete' },
          { color: 'gray', label: 'Publishing Soon' }
        ]
      },
      {
        title: 'Long-Form Compilation',
        description: 'Combining best moments with additional educational content',
        status: 'scheduled',
        statusText: 'Scheduled',
        order: 3,
        tags: [
          { color: 'blue', label: 'Storyboard Ready' },
          { color: 'gray', label: 'Production Next Week' }
        ]
      }
    ];

    console.log("Seeding production timeline...");
    const existingTimeline = await db.query.productionTimeline.findMany();
    if (existingTimeline.length === 0) {
      await db.insert(productionTimeline).values(productionTimelineData);
      console.log(`Added ${productionTimelineData.length} timeline items`);
    } else {
      console.log("Timeline items already exist, skipping");
    }

    // Insert QR code
    const qrCodeData = {
      path: 'download',
      description: 'QR code for downloading Jupiter app',
      scanCount: 1250
    };

    console.log("Seeding QR code...");
    const existingQrCodes = await db.query.qrCodes.findMany();
    if (existingQrCodes.length === 0) {
      await db.insert(qrCodes).values(qrCodeData);
      console.log("Added QR code");
    } else {
      console.log("QR code already exists, skipping");
    }

    // Insert animated outro
    const animatedOutroData = {
      title: 'What is Jupiter?',
      description: 'A 15-second explainer about Jupiter and how it simplifies crypto trading on Solana',
      previewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    };

    console.log("Seeding animated outro...");
    const existingOutros = await db.query.animatedOutros.findMany();
    if (existingOutros.length === 0) {
      await db.insert(animatedOutros).values(animatedOutroData);
      console.log("Added animated outro");
    } else {
      console.log("Animated outro already exists, skipping");
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();

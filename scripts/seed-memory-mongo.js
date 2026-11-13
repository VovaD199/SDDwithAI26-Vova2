const mongoose = require('mongoose');

const PUBLISHED = 'published';

const t = (en, uk = en) => ({ en, uk });

const doc = (text) => ({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text }]
    }
  ]
});

const tDoc = (en, uk = en) => ({ en: doc(en), uk: doc(uk) });

const image = (src, alt, caption = null) => ({
  src,
  alt: t(alt),
  caption: caption ? t(caption) : null
});

const publicImage = (src, alt, caption = null) => ({
  src: `/images/demo/${src}`,
  alt: t(alt),
  caption: caption ? t(caption) : null,
  generatedSrc: `/images/demo/${src}`
});

const quote = (text, source = 'Demo content') => ({
  text: t(text),
  source: t(source)
});

const pageBase = (slug, pageType, title, blocks) => ({
  slug,
  pageType,
  title: t(title),
  status: PUBLISHED,
  blocks
});

const aboutUsPage = pageBase('about-us', 'AboutUsPage', 'About us', {
  IntroSection: {
    title: t('About the Foundation'),
    image: publicImage('demo-about-us.png', 'Foundation archive'),
    quote: quote('A demo page about preserving Ukrainian musical heritage.')
  },
  FoundationInfo: {
    ourOrganisation: tDoc('The Liatoshynsky Foundation demo introduces the project structure and content areas.'),
    ourName: tDoc('This demo database is seeded automatically on startup.'),
    ourBelief: tDoc('Use it to explore the interface without configuring external services.'),
    image: publicImage('demo-foundation.png', 'Foundation demo image')
  },
  OurMission: {
    title: t('Our mission'),
    smallImage: publicImage('demo-mission-small.png', 'Mission detail'),
    bigImage: publicImage('demo-mission-big.png', 'Mission image'),
    list: [
      tDoc('Preserve and share the legacy of Borys Liatoshynsky.'),
      tDoc('Make Ukrainian classical music easier to discover.')
    ]
  },
  OurGoals: {
    title: t('Our goals'),
    goals: [
      {
        title: t('Archive'),
        description: tDoc('Create a convenient digital home for archival materials.')
      },
      {
        title: t('Education'),
        description: tDoc('Support research, performance, and public learning.')
      }
    ]
  },
  LiatoshynskyOffice: {
    quote: quote('The office is represented here by seeded demo content.')
  },
  WhatWeDo: {
    title: t('What we do'),
    items: [
      {
        title: t('Research'),
        description: tDoc('Publish and organize scholarly materials.')
      },
      {
        title: t('Culture'),
        description: tDoc('Promote concerts, recordings, and public programs.')
      }
    ]
  },
  FoundationFounders: {
    titleText: tDoc('Demo founder information appears here.'),
    listTitle: t('Founders'),
    members: [
      {
        photo: publicImage('demo-founder.png', 'Demo founder'),
        name: t('Demo Founder'),
        description: t('Foundation representative')
      }
    ]
  }
});

const biographyPage = pageBase('biography', 'BiographyPage', 'Biography', {
  heroSection: {
    image: {
      src: 'demo-founder.png',
      alt: t('Borys Liatoshynsky portrait'),
      caption: {
        mainText: t('Borys Liatoshynsky'),
        yearText: t('1895-1968')
      }
    },
    quote: quote('Biography demo content for the in-memory database.'),
    biographyText: tDoc('This page can be replaced with real biography content later.'),
    noteText: t('Demo biography note')
  },
  biographyContent: [
    {
      yearTitle: '1895',
      items: [
        {
          type: 'chronologyList',
          listItems: [
            {
              description: tDoc('Demo chronology entry for the biography timeline.')
            }
          ]
        }
      ]
    }
  ],
  LiatoshynskyOffice: {
    quote: quote('Seeded biography office quote.')
  }
});

const researchPage = pageBase('research', 'Research', 'Research', {
  HeroSection: {
    quote: quote('Research demo content is available while the database is in memory.'),
    title: t('Research and scientific works')
  }
});

const cooperationPage = pageBase('cooperation', 'CooperationPage', 'Cooperation', {
  partnershipFormats: {
    title: t('Partnership formats'),
    firstRowFirstCard: {
      title: t('Concerts'),
      list: [t('Joint programs'), t('Educational events')]
    },
    firstRowSecondCard: {
      title: t('Archives'),
      list: [t('Digitization'), t('Research support')]
    },
    descriptionText: t('This is seeded demo partnership content.'),
    actionButtonText: t('Contact us'),
    modalContent: {
      formTitle: t('Offer collaboration'),
      formSubtitle: t('The form is accepted in demo mode without email sending.')
    }
  }
});

const policySection = (title) => ({
  title: t(title),
  description: tDoc(`${title} demo description.`),
  list: [tDoc(`${title} demo list item.`)],
  note: tDoc(`${title} demo note.`)
});

const privacyPolicyPage = pageBase('privacy-policy', 'PrivacyPolicyPage', 'Privacy Policy', {
  IntroSection: {
    trustAndSecurity: tDoc('Demo privacy policy introduction.'),
    agreement: tDoc('Demo agreement text.')
  },
  DataWeCollect: {
    title: t('Data we collect'),
    description: tDoc('Demo data collection description.'),
    sections: [
      {
        subtitle: tDoc('Contact data'),
        description: tDoc('Demo contact data description.'),
        list: [tDoc('Name, email, and message content in demo forms.')]
      }
    ],
    note: tDoc('Demo data collection note.')
  },
  DataUsage: policySection('Data usage'),
  Cookies: policySection('Cookies'),
  GoogleAuth: policySection('Google auth'),
  SocialNetworks: {
    title: t('Social networks'),
    description: tDoc('Demo social networks description.')
  },
  TargetedAds: {
    title: t('Targeted ads'),
    description: tDoc('Targeted ads are disabled in this demo.')
  },
  NewsletterSubscription: {
    title: t('Newsletter subscription'),
    description: tDoc('Newsletter sending is disabled in this demo.')
  },
  DataRetention: {
    title: t('Data retention'),
    description: tDoc('Demo data retention description.')
  },
  UserRights: policySection('User rights'),
  ContactUs: {
    title: t('Contact us'),
    description: tDoc('Demo contact information.')
  }
});

const pages = [aboutUsPage, biographyPage, researchPage, cooperationPage, privacyPolicyPage];

const foundationInfo = [
  {
    slug: 'branding-info',
    foundationName: t('Liatoshynsky Foundation'),
    supportButtonLink: '/support-us'
  },
  {
    slug: 'contact-info',
    email: 'demo@example.com',
    phone: '+380 00 000 00 00',
    address: t('Demo address'),
    socialLinks: []
  },
  {
    slug: 'public-info',
    copyright: t('Liatoshynsky Foundation demo'),
    links: [
      { label: t('Privacy policy'), href: '/privacy-policy' },
      { label: t('Terms'), href: '/terms' }
    ]
  }
];

const navigation = [
  {
    title: t('Foundation'),
    order: 0,
    footerOrder: 1,
    links: [
      { label: t('About us'), href: '/about-us', visibility: true },
      { label: t('Biography'), href: '/biography', visibility: true }
    ]
  },
  {
    title: t('Activity'),
    order: 1,
    footerOrder: 2,
    links: [
      { label: t('Research'), href: '/research', visibility: true },
      { label: t('Cooperation'), href: '/cooperation', visibility: true }
    ]
  },
  {
    title: t('Support'),
    order: 2,
    footerOrder: 3,
    links: [{ label: t('Support us'), href: '/support-us', visibility: true }]
  }
];

function getByPath(value, path) {
  return path.split('.').reduce((current, segment) => current?.[segment], value);
}

async function upsertMany(collection, docs, key = 'slug') {
  for (const item of docs) {
    await collection.updateOne({ [key]: getByPath(item, key) }, { $set: item }, { upsert: true });
  }
}

async function seedMemoryMongo(mongoUrl) {
  await mongoose.connect(mongoUrl);

  await upsertMany(mongoose.connection.collection('pages'), pages);
  await upsertMany(mongoose.connection.collection('foundationinfos'), foundationInfo);
  await upsertMany(mongoose.connection.collection('navigations'), navigation, 'title.en');

  await mongoose.disconnect();

  console.log('[memory-mongo] Seeded demo content');
}

module.exports = {
  seedMemoryMongo
};

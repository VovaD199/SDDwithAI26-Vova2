import dbConnect from '~/infrastructure/db/connect';
import { BrandingInfo } from '~/infrastructure/models/foundation-info/foundationInfoBranding';
import { ContactInfo } from '~/infrastructure/models/foundation-info/foundationInfoContact';
import { PublicInfo } from '~/infrastructure/models/foundation-info/foundationInfoPublic';
import { brandingInfoSchema, contactInfoSchema, publicInfoSchema } from '~/validators/foundationInfo.schema';

const defaultTranslatedValue = {
  uk: 'Demo',
  en: 'Demo'
};

const defaultContactInfo = {
  email: undefined,
  phone: '',
  address: defaultTranslatedValue,
  socialLinks: []
};

const defaultBrandingInfo = {
  foundationName: {
    uk: 'Liatoshynsky Foundation',
    en: 'Liatoshynsky Foundation'
  }
};

const defaultSupportButtonLink = {
  supportButtonLink: undefined
};

const defaultPublicInfo = {
  copyright: defaultTranslatedValue,
  links: []
};

const foundationInfoRepository = {
  async getContactInfo() {
    await dbConnect();

    const result = await ContactInfo.findOne({ slug: 'contact-info' }).select('email phone address socialLinks').lean();

    const parsed = contactInfoSchema.parse(result ?? defaultContactInfo);

    return {
      email: parsed.email,
      phone: parsed.phone ?? '',
      address: parsed.address,
      socialLinks: parsed.socialLinks
    };
  },

  async getBrandingInfo() {
    await dbConnect();

    const result = await BrandingInfo.findOne({ slug: 'branding-info' }).select('foundationName').lean();

    const parsed = brandingInfoSchema.omit({ supportButtonLink: true }).parse(result ?? defaultBrandingInfo);

    return {
      foundationName: parsed.foundationName
    };
  },

  async getSupportButtonLink() {
    await dbConnect();

    const result = await BrandingInfo.findOne({ slug: 'branding-info' }).select('supportButtonLink').lean();

    const parsed = brandingInfoSchema.pick({ supportButtonLink: true }).parse(result ?? defaultSupportButtonLink);

    return {
      supportButtonLink: parsed.supportButtonLink
    };
  },

  async getPublicInfo() {
    await dbConnect();

    const result = await PublicInfo.findOne({ slug: 'public-info' }).select('copyright links').lean();

    const parsed = publicInfoSchema.parse(result ?? defaultPublicInfo);

    return {
      copyright: parsed.copyright,
      links: parsed.links
    };
  }
};

function newFoundationInfoRepo(): typeof foundationInfoRepository {
  return foundationInfoRepository;
}

export default newFoundationInfoRepo;

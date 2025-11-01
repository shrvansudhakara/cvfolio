import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface SiteConfig {
  sections: {
    about: boolean;
    workExperience: boolean;
    talks: boolean;
    writing: boolean;
    socialLinks: boolean;
  };
  elements: {
    avatar: boolean;
    themeSwitch: boolean;
    header: boolean;
    footer: boolean;
  };
}

const defaultConfig: SiteConfig = {
  sections: {
    about: true,
    workExperience: true,
    talks: true,
    writing: true,
    socialLinks: true,
  },
  elements: {
    avatar: true,
    themeSwitch: true,
    footer: true,
    header: true,
  },
};

export function getSiteConfig(): SiteConfig {
  try {
    const configPath = path.join(process.cwd(), 'config.yml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return yaml.load(fileContents) as SiteConfig;
  } catch (error) {
    console.warn('config.yml not found, using defaults');
    return defaultConfig;
  }
}

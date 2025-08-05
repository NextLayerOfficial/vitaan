import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Youtube,
  Mail,
} from "lucide-react";

interface SocialIconProps {
  platform: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const socialIconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  website: Globe,
  youtube: Youtube,
  email: Mail,
};

export const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  className = "",
}) => {
  const IconComponent = socialIconMap[platform.toLowerCase()] || Globe;

  return <IconComponent className={className} />;
};

export default SocialIcon;

import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle,
  Dribbble
} from "lucide-react";

interface SocialIconProps {
  platform: string;
  className?: string;
}

export default function SocialIcon({ platform, className = "w-5 h-5" }: SocialIconProps) {
  const icons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    discord: MessageCircle,
    dribbble: Dribbble,
  };

  const IconComponent = icons[platform.toLowerCase() as keyof typeof icons];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}

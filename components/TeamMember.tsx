import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

export default function TeamMember({ name, role, bio, avatar }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 bg-gradient-to-br from-primary to-orange-600">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl text-white font-bold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-primary font-semibold mb-4">{role}</p>
        <p className="text-gray-600 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}

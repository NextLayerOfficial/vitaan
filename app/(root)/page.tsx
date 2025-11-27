import { Card } from "@/components/ui/card";
import {
  Flower2,
  BookOpen,
  Users,
  Globe,
  Library,
  Sparkles,
  Feather,
  PenTool,
  MessageSquare,
  Presentation,
  Globe2,
} from "lucide-react";

const galleryImages = [
  "https://lh3.googleusercontent.com/pw/AP1GczNjX7vozUuz3Hls-MxdFtNVKvW5cfq5L90zyUtztkXgs4X722AAvu09k7nN5kL3X85-W_sQIU63gTcARlqTFTbMWadRzYtvkMI-OkZF9J1p7XdTqFkoYzHK5vnaq_eaq9emztPNkuNnwg09hTH9nBsACA=w1170-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPqkcZffFsSuPIig9ofbRJVOnn8vApuXnoDAi_VV6ewNyktApSnzmNCyEuQVj0G4AiwcirC2I18h3aMnyYpAIaDrpS-232fASh2SdHwVkpJ21whJDsdfuysNxKto3Xbg88SydnG6wwDTm8AVW8_kla3pA=w1184-h878-s-no-gm?authuser=0",

  "https://lh3.googleusercontent.com/pw/AP1GczOqI3MG4cweT33rpkq7P8xQLkXDKKBgbG5-wD4KM7_64YC4iWOhMDOu7lTnWh14SCsXpYDTiw0TCBQpG9vjviqV6al6UsyWJXkwX7RgHhAb7DBSItMw2ecR3P4E22R3O-CD-v818292aqzMVIGyKH13Dw=w1173-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczOriZyXQrCVgSLjAbcP8rs_smgbDAEXbk20P8Ju40yuuHN4c2QZxP5VwH0oVDNGaavNCUcMhuLbpGHt7Rbvt7Sszr8Xcb1n2wUEyFsY1LFtV8v284_3sskPUOmeFXR53Xc6xxygRivKaK77KzTKfIiXMw=w1170-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczN7qKbE1Xe-HO_5TUx6LEOWGDFurDvCoNhMVx_f0ururLajCdKI1sjzWgf1xYy4OAE3nc-hmSA6gwhULZT2QTi_gSADX9qOnw67H7kdwYbHQebg-3txbX0mYa2exA-DCtHD1Qezfj7QdGulGWaDZGRwaQ=w1170-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczMHsHW2oTiYQhgT-WzPUf17jitqUzeYxXli35iNNu4_tRlCimqvCnJmiAcYEdWx2kuAfGo10vdVf3lAVMp6XpyUiEc_VG8YVK6QKvPZq7iXm990NgAGsI_YxZrTNb8T9gpatvTiijXf5HDQXeYBG1Ro9Q=w1173-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczOjS36ds4h-fWttzh_oXGQdMOU4t80x1YauMpEs-VjjBCPa0t7qbj-5YmgvEk-wKXjmcjQRE1UtfoWduut9C1-_ro41eussvFlTyfU6et448qJX8dNrOmhFzDPX-QFMkBbV6apr9Ev4XoKqUR8q9Ee0jg=w1167-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPy3aWIfqQ5Sb9cGW-ni4RiuE8RG4XH321p2SU9iacjQ6jPnrnA_tXwa81NOgnBKMbUFUmUOjyzTaBSFpTAonFS3sWrG7Qout_iU2ffPlHvgx1rj5505-kfm5G2PBrih6nQWUdmryhctQbYzXpNBLc-4g=w1169-h878-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPJ9nzhiedQ0rVFBCSctgbMDyWe0MXitq3wyupJ6OhZ0tvsiXLXKGD0i5fWZoBNpxZo-52IKByBbvUx_R4N-cXjbstyYRF-OCKvrNDUDfxVGYojjDSNve5tZpB25UHz11onnx7BU1Uhe1WnvfjJSHHA4A=w1173-h878-s-no-gm?authuser=0",
  // "/india.png",
  // "/india.png",
  // "/india.png",
  // "/india.png",
  // "/india.png",
  // "/india.png",
  // "/india.png",
];

// Data for the sections remains the same.
const activities = [
  {
    icon: <Presentation className="w-7 h-7" />,
    title: "विसंवाद",
    description: 'वितान के सदस्यों का वार्षिक सम्मेलन "विसंवाद" का आयोजन।',
  },
  {
    icon: <Feather className="w-7 h-7" />,
    title: "प्रकाशन",
    description: "वितान की वार्षिक पत्रिका / स्मारिका और ई-पत्रिका का प्रकाशन।",
  },
  {
    icon: <PenTool className="w-7 h-7" />,
    title: "कार्यशालाएं",
    description:
      "वितान के सदस्यों द्वारा ऑनलाइन माध्यम से विभिन्न प्रकार की कार्यशालाओं का आयोजन।",
  },
  {
    icon: <MessageSquare className="w-7 h-7" />,
    title: "साहित्यिक परिचर्चा",
    description: "सोशल मीडिया के माध्यम से ऑनलाइन साहित्यिक परिचर्चा का आयोजन।",
  },
  {
    icon: <Globe2 className="w-7 h-7" />,
    title: "डिजिटल उपस्थिति",
    description:
      "वितान की वेबसाइट एवं सोशल मीडिया प्लेटफार्म पर साहित्यिक गतिविधियों का संचालन।",
  },
];

const objectives = [
  {
    icon: <Flower2 className="w-8 h-8 text-amber-700" />,
    text: "भारतीय संस्कृति, साहित्य और कला का संरक्षण और संवर्धन करना।",
  },
  {
    icon: <Globe className="w-8 h-8 text-amber-700" />,
    text: "भारतीय साहित्य और अन्य भाषाओं के साथ साहित्यिक अंतर्क्रिया को बढ़ावा देने के लिए दुनिया भर के विभिन्न संगठनों और देशों के साथ साहित्यिक आदान-प्रदान कार्यक्रम शुरू करना।",
  },
  {
    icon: <Users className="w-8 h-8 text-amber-700" />,
    text: "भारत एवं विदेश में विभिन्न स्थानों पर साहित्यिक कार्यशालाएं, उत्सव, प्रदर्शनियां, संगोष्ठियां, साहित्यिक संवाद एवं चर्चाएं, पुस्तक विमोचन आदि का आयोजन करना।",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-amber-700" />,
    text: "व्यक्तिगत और सामूहिक साहित्यिक शोध कार्यों को प्रकाशित करना।",
  },
  {
    icon: <Library className="w-8 h-8 text-amber-700" />,
    text: "साहित्यिक पुस्तकों के समृद्ध संग्रह के साथ भारत में बहुभाषी पुस्तकालयों की स्थापना करना।",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-amber-700" />,
    text: "अपने प्रकाशन कार्यों की विभिन्न आवश्यकताओं की पूर्ति हेतु अपना स्वयं का प्रकाशन गृह स्थापित करना।",
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-slate-50 font-sans">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-48 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM11 68c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48-50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\' fill=\'%23e2e8f0\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3e%3c/svg%3e')] opacity-50"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="font-hindi text-6xl sm:text-7xl lg:text-[8.4rem] font-bold text-slate-900 tracking-tight">
              वितान
            </h1>
            <p className="font-hindi text-xl sm:text-2xl text-slate-600 mt-4 max-w-2xl mx-auto">
              सर्जना का विस्तृत स्वरूप
            </p>
            <div className="mt-12">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg p-8 sm:p-10 text-left">
                <div className="space-y-6 font-hindi text-lg leading-relaxed text-slate-700">
                  <p>
                    'वितान' एक साहित्यिक संस्था है जिसकी स्थापना हमारी गौरवशाली
                    भारतीय संस्कृति एवं परंपराओं का अनुसरण करते हुए साहित्यिक
                    क्षेत्र में योगदान देने के लिए हुई। यह सर्जना से जुड़े पूर्व
                    छात्रों का वह स्नेह-सूत्र है जो सर्जना की गौरवशाली परंपराओं
                    को स्थान और समय की सीमाओं से परे ले जाता है।
                  </p>
                  <p>
                    यह केवल एक पूर्व छात्र समूह नहीं, अपितु अतीत और वर्तमान के
                    बीच एक सेतु का कार्य करता है जो नई पीढ़ी की सृजनात्मक शक्ति
                    को अनुभवी कलमों से जोड़ता है। सर्जना ने जहाँ साहित्य के बीज
                    बोए, वहीं वितान उन बीजों से पल्लवित वृक्षों की छाया है, जो
                    देश-विदेश में अपनी जड़ें जमा चुकी हैं।
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Activities Section */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="font-hindi text-4xl sm:text-5xl font-bold text-slate-900">
                हमारे मुख्य कार्य
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                साहित्यिक चेतना के विस्तार और सृजनात्मक अभिव्यक्ति को मंच प्रदान
                करने के हमारे प्रयास।
              </p>
              <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 mb-16"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="bg-white border border-slate-200 rounded-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-700 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white">
                    {activity.icon}
                  </div>
                  <h3 className="font-hindi text-2xl font-semibold text-slate-800 mb-3">
                    {activity.title}
                  </h3>
                  <p className="font-hindi text-slate-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              ))}
              <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-8 transition-all duration-300 hover:shadow-xl hover:border-amber-500 hover:-translate-y-2 group flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-amber-200 text-amber-800 rounded-full mb-6">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-hindi text-2xl font-semibold text-amber-900 mb-3">
                  और भी बहुत कुछ
                </h3>
                <p className="font-hindi text-amber-800 leading-relaxed">
                  भविष्य में नई साहित्यिक गतिविधियों और योजनाओं का समावेश।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="font-hindi text-4xl sm:text-5xl font-bold text-slate-900">
                हमारा मूल उद्देश्य
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                भारतीय साहित्य और संस्कृति की जड़ों को सींचते हुए वैश्विक पटल पर
                एक नई पहचान बनाना।
              </p>
              <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 mb-16"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-5 relative">
                  <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mt-1">
                    {objective.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-hindi text-lg text-slate-700 leading-relaxed">
                      {objective.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-hindi text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              एक अक्षर से आरम्भ हुई यह यात्रा एक विराट संकल्पना बन चुकी है।
            </h2>
            <p className="font-hindi text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              आइए, इस साहित्यिक और भावनात्मक विस्तार का साक्षी बनें और इसकी
              निरंतरता में अपना अमूल्य योगदान दें।
            </p>
          </div>
        </section> */}
        {/* Photo Gallery Section */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-hindi text-4xl sm:text-5xl font-bold text-slate-900">
                स्मृतियों की झलकियाँ
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                साहित्यिक यात्रा के बहुमूल्य पलों का दृश्य संग्रह
              </p>
              <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
              {galleryImages.map((src, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-sm shadow-sm border border-slate-200 group cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`gallery-${index}`}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

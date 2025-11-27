
import React, { useState } from "react";
import { UserRound, Smartphone, Mail, Building } from "lucide-react";
import Image from "next/image";

export default function PopupForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selection, setSelection] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!selection) {
    //   alert("Please select an option from the dropdown.");
    //   return;
    // }
    // Compose WhatsApp message
    const message = `Name: ${name}%0AMobile: ${mobile}%0AEmail: ${email}`;
    const whatsappUrl = `https://wa.me/918828607952?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] px-4 lg:px-0 backdrop-blur-sm bg-black/40">
      <div className="relative bg-white text-[#111] rounded-3xl overflow-visible shadow-[0_8px_32px_rgba(0,0,0,0.18)] border-[3px] border-[#e6c75c] w-full max-w-[480px] lg:max-w-[26vw] p-[4vw] lg:p-[1.4vw]  ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-[#111] text-3xl cursor-pointer"
          aria-label="Close"
          type="button"
        >&times;</button>
        <h3 className="font-bold mb-4 text-[24px] lg:text-[24px] tracking-wide text-center">CONTACT US</h3>
        <div className="flex flex-row items-center justify-center gap-6 mb-4 lg:mb-[1vw] ">
          <Image width={150} height={120} src="/Images/chot2New.png" alt="RK Logo" className="w-[25vw] sm:w-[18vw] lg:w-[7vw] object-contain rounded-lg p-4 bg-green-900" />
        </div>
        {submitted ? (
          <div className="text-center text-[#111]">
            <h3>Thank you for contacting us!</h3>
            <p>We have received your details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">

            <div className="flex items-center bg-[#e0e0e0] rounded-lg px-3  mb-4">
              <UserRound className="mr-2 lg:mr-[0.6vw] w-5 lg:w-7 h-5 lg:h-6 text-black" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="border-none bg-transparent outline-none text-base lg:text-[1vw] text-black placeholder-black py-3 lg:py-[0.6vw] w-full"
              />
            </div>
            <div className="flex items-center bg-[#e0e0e0] rounded-lg px-3 mb-4">
              <Smartphone className="mr-2 lg:mr-[0.6vw] w-5 lg:w-7 h-5 lg:h-6 text-black" />
              <input
                type="tel"
                placeholder="Mobile"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="border-none bg-transparent outline-none text-base lg:text-[1vw] text-black placeholder-black py-3 lg:py-[0.6vw] w-full"
              />
            </div>
            <div className="flex items-center bg-[#e0e0e0] rounded-lg px-3 mb-4">
              <Mail className="mr-2 lg:mr-[0.6vw] w-5 lg:w-6 h-5 lg:h-6 text-black" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="border-none bg-transparent outline-none text-base lg:text-[1vw] text-black placeholder-black py-3 lg:py-[0.6vw] w-full"
              />
            </div>
            {/* <div className="flex items-center bg-[#e0e0e0] rounded-lg px-3 mb-4">
              <Building className="mr-2 lg:mr-[0.6vw] w-5 lg:w-6 h-5 lg:h-6 text-black" />
              <select
                name="selection"
                value={selection}
                onChange={e => setSelection(e.target.value)}
                required
                aria-label="Select Configuration"
                className="border-none bg-transparent outline-none text-base lg:text-[1vw] text-black py-3 lg:py-[0.8vw] w-full transition-all duration-300 ease-in-out   shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(191,161,58,0.08)' }}
              >
                <option value="" hidden>Interested-in</option>
                <option value="Option 1">1 BHK – 350 to 384 sq.ft.</option>
                <option value="Option 2">1 BHK with Deck – 384 sq.ft.</option>
                <option value="Option 3">2 BHK – 550 to 569 sq.ft.</option>
                <option value="Option 4">2 BHK with Deck – 585 to 603 sq.ft</option>
              </select>
            </div> */}
            <button type="submit" className="bg-gradient-to-r from-[#bfa13a] via-[#e6c75c] to-[#bfa13a] text-[#111] border-none rounded-lg py-3 font-bold text-base lg:text-[1.2vw] mt-2 lg:mt-[1vw] cursor-pointer tracking-wide w-full shadow-[0_2px_8px_rgba(191,161,58,0.08)] transition-colors duration-200 hover:from-[#e6c75c] hover:via-[#bfa13a] hover:to-[#e6c75c]">SUBMIT</button>
            <div className="flex flex-row items-center justify-center gap-6 mb-3 lg:mb-[1vw] mt-[5vw] lg:mt-[2vw]">
              <span
                style={{ fontFamily: 'Argue Demo, Poppins, Arial, sans-serif', fontWeight: 'bold', color: '#10320f' }}
                className="text-center text-base lg:text-[1vw] w-full"
              >
                AVIGHNA SPACES
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

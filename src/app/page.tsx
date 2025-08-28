import Gallery from "@/components/Gallery";
import Greeting from "@/components/Greeting";
import Poster from "@/components/Poster";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Full-bleed poster first - White BG */}
            <section id="poster" className="bg-white">
                <Poster />
            </section>

            {/* Greeting section - Light Gray BG */}
            <section id="greeting" className="bg-gray-50">
                <div className="container mx-auto max-w-4xl px-4">
                    <Greeting />
                </div>
            </section>

            {/* Gallery section - White BG */}
            <section id="gallery" className="bg-white ">
                <div className="container mx-auto max-w-4xl px-4">
                    <Gallery />
                </div>
            </section>
        </main>
    );
}

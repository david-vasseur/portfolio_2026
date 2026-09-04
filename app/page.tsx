"use client"

import ContactSection from "@/components/pages/ContactSection";
import HomePage from "@/components/pages/HomeSection";
import TemplateHome from "@/components/pages/TemplateHome";
import WorkSection from "@/components/pages/WorkSection";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import Wrapper from "@/lib/scroll/Wrapper";

export default function Home() {

    return (
		<div className="relative bg-[linear-gradient(to_top_left,#6E56CF_0%,#6E56CF_2%,#1B1525_90%,#1B1525_100%)]">
			<Wrapper>
				{/* <section className="h-lvh flex flex-col items-center justify-center w-full">
					<Title titleContent={["Ceci est la page", "numero 1"]} />
					<Subtitle subtitleContent="Ceci et le sous tritre de la page 1" />
				</section> */}
				<TemplateHome />
				<WorkSection />
				<ContactSection />
			</Wrapper>
		</div>
    );
}

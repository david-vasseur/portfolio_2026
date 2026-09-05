"use client"

import ContactSection from "@/components/pages/ContactSection";
import HomeSection from "@/components/pages/HomeSection";
import WorkSection from "@/components/pages/WorkSection";
import Wrapper from "@/lib/scroll/Wrapper";

export default function Home() {

    return (
		<div className="relative bg-[linear-gradient(to_top_left,#6E56CF_0%,#6E56CF_2%,#1B1525_90%,#1B1525_100%)]">
			<Wrapper>
				<HomeSection />
				<WorkSection />
				<ContactSection />
			</Wrapper>
		</div>
    );
}

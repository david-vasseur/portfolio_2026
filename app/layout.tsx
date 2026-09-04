import type { Metadata } from "next";
import { Geist, Geist_Mono, Anta } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const anta = Anta({
	variable: "--font-anta",
	weight: "400",
	subsets: ["latin"],
});	

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "David Vasseur - Portfolio",
	description: "David Vasseur - Développeur web fullstack",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${anta.variable} h-lvh antialiased`} 
		>
			<body className="min-h-full flex flex-col">
				<NavBar />
				{children}
			</body>
		</html>
	);
}

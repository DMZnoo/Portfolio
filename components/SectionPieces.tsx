"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export function PersonalProjects() {
	const [pulse, setPulse] = useState(0);
	useEffect(() => {
		const id = window.setInterval(() => setPulse((p) => p + 1), 2400);
		return () => window.clearInterval(id);
	}, []);

	const n = profile.nowWorking;

	return (
		<div
			style={{
				position: "relative",
				padding: "22px 24px",
				borderRadius: 14,
				background:
					"linear-gradient(135deg, rgba(38,200,235,0.10), rgba(15,23,42,0.5))",
				border: "1px solid rgba(38,200,235,0.25)",
				overflow: "hidden",
			}}
		>
			<div
				key={pulse}
				className="animate-ping-slow"
				style={{
					position: "absolute",
					top: 22,
					left: 24,
					width: 10,
					height: 10,
					borderRadius: 999,
					border: "2px solid #26c8eb",
				}}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 10,
				}}
			>
				<span
					style={{
						width: 10,
						height: 10,
						borderRadius: 999,
						background: "#26c8eb",
						boxShadow: "0 0 12px #26c8eb",
						display: "inline-block",
					}}
				/>
				<span
					style={{
						fontSize: 10.5,
						fontWeight: 700,
						letterSpacing: 2,
						color: "#26c8eb",
						textTransform: "uppercase",
						fontFamily: "'JetBrains Mono', monospace",
					}}
				>
					{n.label}
					{n.tag ? ` - ${n.tag}` : ""}
				</span>
			</div>
			<p
				style={{
					margin: 0,
					fontSize: 14.5,
					lineHeight: 1.6,
					color: "#e2e8f0",
					maxWidth: 540,
				}}
			>
				{n.text}
			</p>
		</div>
	);
}

export function SectionHeading({ num, label }: { num: string; label: string }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 14,
				marginBottom: 28,
				paddingTop: 4,
			}}
		>
			<span
				style={{
					fontFamily: "'JetBrains Mono', monospace",
					color: "#26c8eb",
					fontSize: 13,
					fontWeight: 500,
				}}
			>
				{num}
			</span>
			<h3
				style={{
					margin: 0,
					fontSize: 22,
					fontWeight: 600,
					color: "#f1f5f9",
					letterSpacing: -0.4,
				}}
			>
				{label}
			</h3>
			<div
				style={{
					flex: 1,
					height: 1,
					background:
						"linear-gradient(90deg, rgba(148,163,184,0.18), transparent)",
				}}
			/>
		</div>
	);
}

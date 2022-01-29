--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, "createdAt", "updatedAt", display, title, "shortName", description, "previewImg", "iconImg", "coverImg", "redirectUrl", "joinable") FROM stdin;
6	2022-01-11 14:55:56.932911	2022-01-11 15:16:50.183952	t	WAI102 - An Introduction to Neural Networks	wai102	**This course has finished.**	https://images.unsplash.com/photo-1567360425618-1594206637d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80      		f
7	2022-01-11 14:56:24.797936	2022-01-13 18:33:57.582194	t	WAI118 - An Introduction to Python	wai118	**This course has finished.**\n\nCode and notebooks: https://github.com/WarwickAI/natural-selection-sim/	https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=459&q=80       		f
3	2022-01-04 20:07:17.662643	2022-01-09 12:20:49.657506	t	WAI202 Introduction to Computer Vision	wai202	Computer Vision essentially helps computers 'see' and extract useful information from images or videos.\nFrom medical image processing to autonomous cars, the applications are endless.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nSounds exciting? Join us from week 8 to week 10 during CodeNights for a walkthrough this course's tutorials.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \n*Cover Image Source: https://cs.stanford.edu/people/karpathy/cnnembed/*	https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80      		t
5	2022-01-11 14:55:34.632536	2022-01-13 18:35:59.361416	t	WAI101 - An Introduction to Artificial Intelligence 	wai101	**This course has finished.**\n\nResources: https://docs.google.com/document/d/1fvR4EEchW-dqlou7Yl2guiubTaOB86I-odnmyMRZakU/	https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80   f
8	2022-01-11 14:57:14.91619	2022-01-11 15:17:42.886322	t	WAI199 - An Introduction to AI Safety	wai199	**This course has finished.**	https://images.unsplash.com/photo-1561212044-bac5ef688a07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80      		f
2	2022-01-04 20:05:37.904708	2022-01-27 22:45:06.836474	t	WAI261 Introduction to Software Engineering	wai261	With the democratization of machine learning training a new model or using existing models has never been easier,\nhowever, it's through applications that these models come to life.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nIn this course, you will learn how to turn a model into a **real-world application**, from front-end to back-end, using **modern** technologies.\n\n&nbsp;\n\nThis course will guide you through:\n- Creating a **web app** using [React](https://reactjs.org/) and learning how to manage state, send requests to an API and create a user interface.\n- Develop a back-end API server handling requests to and from an ML model (technology here will either be [Flask](https://flask.palletsprojects.com/en/2.0.x/) or [ExpressJS](https://expressjs.com/)).\n- Deploy the front-end and back-end into production.\n\n &nbsp;\n\n**Prerequisites**\n\n&nbsp;\n\nRequired:\n- Basic programming knowledge (for example having taken WAI118 - An Introduction to Python).\n\n&nbsp;\n\nAlthough not essential, having knowledge in these areas before starting this course will be very beneficial:\n- HTML and CSS - [tutorial](https://www.w3schools.com/html/)\n- JavaScript basics - [tutorial](https://www.w3schools.com/js/)\n\nsince these concepts won't be covered in much detail.\n\n&nbsp;\n\n**Key Dates:**\n\n&nbsp;\n\n- **Tutorial 1**: *Week 3* - Intro to web dev, Node and React\n- **Tutorial 2**: *Week 4* - More React (state management, component life cycle)\n- **Tutorial 3**: *Week 5* - Creating a back-end/server and querying\n- **Tutorial 4**: *Week 6* - Client-Server integration and project deployment\n\n&nbsp;\n\n**Resources:**\n\n&nbsp;\n\n- [Tutorial 0](https://medium.com/warwick-artificial-intelligence/wai261-tutorial-0-setting-up-vscode-git-and-nodejs-71ed3e0ef3d3)\n- [Tutorial 1 Slides](https://amplify-waiplatform-dev-222739-deployment.s3.eu-west-2.amazonaws.com/courses/wai261/WAI261+-+Tutorial+1+Slides.pdf) - [VSCode Getting Started](https://code.visualstudio.com/docs/introvideos/basics) - [Git/GitHub Getting Started](https://docs.github.com/en/get-started) - [ChakraUI Documentation](https://chakra-ui.com/docs/getting-started)	https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80       		f
4	2022-01-04 20:10:19.786243	2022-01-20 14:51:17.687876	t	WAI203 An Intermediate guide to NLP for Financial Sentiment Analysis	wai203	With the recent advancements in NLP, financial analytics firms are using NLP "to parse textual data hundreds of thousands of times **faster** and more **accurately** than humans can"[[1]].\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nSounds exciting?\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nJoin us, for the first tutorial of this course, where you will fine-tune a **state-of-the-art** language model for financial sentiment analysis using 🤗/Transformers, analyse your results using [Weights & Biases](https://wandb.ai/site), and evaluate the performance of your model.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nFinally, you will use your model to create an application that can automatically analyse Tweets related to particular instruments and display this information in a nice dashboard.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \n**Key Dates:**\n-  First tutorial: Week 2, released on our blog and walkthrough during CodeNights (Thursday)\n-  Second tutorial: Week 7, released on our blog and walkthrough during CodeNights (Thursday)\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \n**Tutorials:**\n\n1️⃣ [Part 1](https://medium.com/warwick-artificial-intelligence/wai203-part-1-fine-tuning-our-model-204f6d0bc5c)\n\n\n[1]:  https://mitsloan.mit.edu/ideas-made-to-matter/why-finance-deploying-natural-language-processing\n	https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=268&q=80	        	t
\.


--
-- Data for Name: course_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_users_user ("courseId", "userId") FROM stdin;
2	6
4	6
3	6
4	12
3	13
2	14
3	14
4	14
3	16
2	16
2	17
4	17
3	17
2	18
3	18
2	19
4	19
4	20
2	20
3	20
2	22
2	21
2	1
4	11
3	11
2	11
2	29
2	30
3	33
2	33
4	35
2	39
3	39
4	39
2	15
2	40
2	41
2	37
2	43
2	44
2	45
2	46
2	47
2	31
3	27
2	27
3	49
2	50
2	53
2	54
2	55
4	37
3	37
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (id, "createdAt", "updatedAt", display, title, "shortName", description, "previewImg", "iconImg", "coverImg", "redirectUrl", "joinable") FROM stdin;
5	2022-01-08 21:29:12.315807	2022-01-13 18:26:32.444457	t	Reinforcement Learning Cat	robotcat	**This project is closed for signups.**  \n\n&nbsp;  \n\nNybble is a small robotic cat with 2 servomotors on each leg and orientation sensors. This project aims to teach Nybble to walk by itself via Reinforcement learning trained towards producing the fastest forward motion with the least amount of limb movements.\n\n&nbsp;\n\nA team of four students has been recruited for this project, which will meet on a weekly basis at our Coding Nights. 	https://i.ytimg.com/vi/dZIqpE_9ru0/maxresdefault.jpg	        	f
1	2022-01-04 00:36:56.454467	2022-01-07 22:36:49.952901	f	Test Project	test-project	This is a **test** project.		https://images.unsplash.com/photo-1615038552039-e1b271f14ec8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80	        	t
2	2022-01-08 15:04:23.489954	2022-01-11 14:52:31.907811	t	Automating Creativity	automatingcreativity	The industrial revolution saw widespread automation of **manual** labour.  \nThe technological revolution is leading to the increasing automation of more and more complex **cognitive** tasks.  \n&nbsp;&nbsp;  \nSome say that the **creative** domain is the last bastion of humanity, untouchable by our ever-expanding technological prowess.  \n&nbsp;&nbsp;   \nBut what if we could automate that too?  \n&nbsp;&nbsp;   \nIn this workshop, we'll explore how Large Language Models such as OpenAI's GPT-3 can be used to automate tasks once reserved only for humans, with a high level of accuracy;  \n &nbsp;&nbsp;   \n-  Essay writing on a given topic\n-  Generation of fiction \n-  Creation of storyboards for idea generation \n&nbsp;&nbsp;   \n&nbsp;&nbsp;   \nThe descendents of Large Language Models like GPT-3 are likely going to play a key role in our future, whether we like it or not. This workshop will give you a chance to get to grips with them, whilst perhaps something useful in the process. \n&nbsp;&nbsp;   \n&nbsp;&nbsp; \n\n	https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80	        	t
7	2022-01-11 18:28:43.750859	2022-01-11 18:28:43.750859	t	Shopping Receipt Analysis	shoppingticket	**Signups for this project have closed, and the project team has been chosen.**	SIGNUP CLOSED	https://images.unsplash.com/photo-1623123096602-35c9aabf9407?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80	        	f
8	2022-01-11 18:30:29.341273	2022-01-13 17:52:57.036279	t	Language Buddy 	languagebuddy	Signups for this project have closed, and the project team has been chosen.\n\nLanguage Buddy aims to be a chat-bot platform that has a conversation with the user in\nany language they desire to learn. Using the AI GPT-3, which is trained on the internet,\nour prompts will allow the bot to have formal and informal conversations, which will\nfurther help users learn languages in a much more interactive manner. Language Buddy\nwill support full linguistic communication, including applying vocabulary, grammar, and\npronunciation via conversation.	SIGNUP CLOSED	https://i.imgur.com/daz0XK4.png		        f
6	2022-01-11 18:26:35.077218	2022-01-11 18:47:06.547888	t	Property Search 	propertysearch	**Signups for this project have closed, and the project team has been chosen.**\n\n&nbsp;&nbsp;  \n\nCurrently the experience of property searching is extremely frustrating with the very narrow abilities to filter on a wide range of criteria that allows individuals to better narrow the search and improve the chances of finding the perfect property that is closest to the requirements of the person searching.\n\n&nbsp;&nbsp;  \n\nAll property search portals have a very limited number of filters available, such as number of bedrooms or type of property. But there is so much more complexity to property classification and grouping, that would help to filter down the number of properties available in a search.\n\nWe want to explore the capabilities of AI and Machine Learning to extract more useful information from the provided property information (images and text description). This extracted information will essentially enable more descriptive filtering options and improved classification and grouping of properties.\n\n&nbsp;&nbsp;  \n\nThree parts to this project:\n- &nbsp;  Computer Vision techniques will be used to generate, via NLG methods, additional textual information from images of the property, for example, the style and period of the property, architectural features, style of windows, etc.\n- &nbsp;  Text analysis will be used on the property description to determine additional parameters that can be used as supplementary tags and filter criteria to aid the search options.\n- &nbsp;  Development of improved recommendation algorithms to provide more targeted selection of properties for a given set of user requirements.	https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80	        	f
4	2022-01-08 21:09:51.606071	2022-01-22 11:28:37.601198	t	ClimateHack	climatehack	Warwick AI is proud to present Climate Hack, an alliance between the artificial intelligence societies of some of the world's best universities in the fight against climate change, organised by the UCL AI society.\n\n&nbsp;&nbsp;  \n\n\nYour challenge is to beat current UK cloud coverage forecasts so that predictions of future solar photovoltaic power production may be improved. This could allow National Grid to minimise the use of idling natural gas turbines, saving potentially up to 100 kilotonnes in carbon emissions per year in the process.\n\n![](https://imgur.com/a/rew8aWC)\n\n&nbsp;&nbsp;\n\nThis will be a competition open to all of our members, and we encourage everyone to get involved. This is a great opportunity to:  \n&nbsp;&nbsp;  \n&nbsp;&nbsp;  \n- Make a difference in the battle against climate change,\n- Learn more about AI and test your skills\n- Meet (in person and online) people from some of the world's best universities.\n- Compete in London over 2 days, transport & accommodation paid\n- Win **£50,000**\n\n&nbsp;&nbsp;  \n\n**How does it work?**\n- We'll work in teams of 3, meeting every Thursday at 6pm in FAB2.43 to work on our solutions \n- Each team will submit their solutions to the competition platform and be ranked on the leaderboard\n- After 8 weeks, the Warwick team with the highest rank on the leaderboard will go to London to compete in the finals \n- Transport and accommodation will be paid for \n- In London, you'll compete against the best team from the other Universities for the grand prize\n\n&nbsp;&nbsp;  \n\nTo get involved, sign up by clicking **join** above and come to Code Night in **FAB2.43** on **February 3rd**. \n\n\n&nbsp;&nbsp;  \n\nWe look forward to seeing you there!	https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=792&q=80	        	t
\.


--
-- Data for Name: project_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_users_user ("projectId", "userId") FROM stdin;
1	4
1	1
2	4
2	14
2	15
2	16
4	23
2	24
4	24
2	11
4	11
2	26
4	26
4	4
4	28
2	31
2	19
4	19
2	34
4	37
4	48
2	27
2	49
4	52
4	61
4	62
\.


--
-- Data for Name: talk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.talk (id, "createdAt", "updatedAt", display, title, "shortName", description, "previewImg", "iconImg", "coverImg", "redirectUrl", "joinable") FROM stdin;
1	2022-01-05 18:26:16.087917	2022-01-07 22:37:16.051778	f	Test Talk	test-talk				t
2	2022-01-08 12:54:40.721459	2022-01-28 05:33:48.127166	t	Using Language Models to Prove Truths About Reality	stanislaspolu	Stanislas Polu is a research is a research engineer working on the problem of automated theorem proving; how can we prove truths about reality without a human in the loop? Stanislas is engaged in research related to the use of advanced language models to tackle this problem, with the ultimate aim of creating a system that could compete in Maths Olympiads, and one day even perform the work of an artificial Mathematician.\n\n&nbsp;&nbsp;  \nStanislas will be speaking to WAI on **11 January** at **4pm** in **L3**.\n\n&nbsp;&nbsp;\n\nTo join press Join above and look out for updates in our Discord.\n                                                                                                                                              \n	https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80	https://medium.com/warwick-artificial-intelligence/using-language-models-to-prove-truths-about-reality-cb589055685b     	f
3	2022-01-25 03:31:32.394017	2022-01-28 16:57:42.179481	t	10 Things You Should Know About Computation and Artificial Intelligence	FelixHovsepian		https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80	https://medium.com/warwick-artificial-intelligence/10-things-you-should-know-about-computation-and-artificial-intelligence-c965debf67e      	f
4	2022-01-25 03:38:15.494947	2022-01-28 16:57:48.509968	t	Can Environmental Science and AI help achieve Sustainability?	KevinDonkers		https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZW52aXJvbm1lbnRhbCUyMHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60	https://medium.com/warwick-artificial-intelligence/can-environmental-science-and-ai-help-achieve-sustainability-72bbacbc64c9	        f
\.


--
-- Data for Name: talk_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.talk_users_user ("talkId", "userId") FROM stdin;
2	4
2	16
2	10
\.


--
-- Data for Name: tutorial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tutorial (id, "createdAt", "updatedAt", display, title, "shortName", description, "previewImg", "iconImg", "coverImg", "redirectUrl", "joinable") FROM stdin;
5	2022-01-11 13:53:57.805693	2022-01-11 13:53:57.805693	t	A Simple Facial Recognition Web App 	frwebapp		https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80	https://github.com/WarwickAI/simple-face-recognition        	f
1	2022-01-04 14:12:12.694973	2022-01-07 22:37:09.739244	f	Becoming Chimp	chimp	The **chimpanzee** (Pan troglodytes), also known simply as chimp, is a species of great ape native to the forest and savannah of tropical Africa. It has four confirmed subspecies and a fifth proposed subspecies. The chimpanzee and the closely related bonobo are classified in the genus Pan. Evidence from fossils and DNA sequencing shows that Pan is a sister taxon to the human lineage and is humans' closest living relative. The chimpanzee is covered in coarse black hair, but has a bare face, fingers, toes, palms of the hands, and soles of the feet. It is larger and more robust than the bonobo, weighing 40–70 kg (88–154 lb) for males and 27–50 kg (60–110 lb) for females and standing 120 to 150 cm (3 ft 11 in to 4 ft 11 in).\n\nThe chimpanzee lives in groups that range in size from 15 to 150 members, although individuals travel and forage in much smaller groups during the day. The species lives in a strict male-dominated hierarchy, where disputes are generally settled without the need for violence. Nearly all chimpanzee populations have been recorded using tools, modifying sticks, rocks, grass and leaves and using them for hunting and acquiring honey, termites, ants, nuts and water. The species has also been found creating sharpened sticks to spear small mammals. Its gestation period is eight months. The infant is weaned at about three years old, but usually maintains a close relationship with its mother for several years more.\n	https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80	        	t
7	2022-01-11 13:55:52.563581	2022-01-11 13:55:52.563581	t	NLP for Financial Sentiment Analysis - Part II	nlpcourse2	Check back here soon for more information! \n\nIn the meantime, click **join** to be notified when this content is available. 	        		t
3	2022-01-11 13:41:08.74049	2022-01-11 13:43:54.63581	t	Gesture Controlled Drone - Part II	dronetutorial2		https://i.imgur.com/mLFvvj0.jpeg	https://medium.com/warwick-artificial-intelligence/gesture-controlled-drone-using-hand-pose-estimation-part-2-4d10cddcba58      	f
2	2022-01-11 13:36:35.153547	2022-01-11 13:44:03.290182	t	Gesture Controlled Drone - Part I	dronetutorial1		https://i.imgur.com/lzKJdHR.jpg	https://medium.com/warwick-artificial-intelligence/gesture-controlled-drone-using-hand-pose-estimation-part-1-b2c13dbf36ef      	f
4	2022-01-11 13:43:46.615166	2022-01-11 13:44:49.187172	t	Basic Image Classifier	classifiertutorial		https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80	https://medium.com/warwick-artificial-intelligence/wai102-image-classification-d1ce237d58d4	        f
9	2022-01-14 17:54:27.791102	2022-01-14 17:54:27.791102	f	GitHub Minesweeper	gh-minesweeper			https://profy.dev/project/github-minesweeper	        f
10	2022-01-14 17:54:33.51036	2022-01-14 17:54:33.51036	f	GitHub Minesweeper	gh-minesweeper			https://profy.dev/project/github-minesweeper	        f
8	2022-01-14 17:54:22.823415	2022-01-14 17:58:11.827893	t	GitHub Minesweeper	gh-minesweeper		https://i.imgur.com/aICWxki.png	https://profy.dev/project/github-minesweeper	        f
6	2022-01-11 13:55:15.050304	2022-01-20 14:50:06.520962	t	NLP for Financial Sentiment Analysis - Part I	wai203-1	Modern language models are trained on very large text corpora. This allows these models to develop a generalized “understanding” of language which can then be leveraged for many purposes, including sentiment analysis.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nThis is called **Transfer Learning**.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \nIn the first tutorial of the WAI203 course, we will use transfer learning to create our very own model for financial sentiment analysis.\n &nbsp;&nbsp;  \n &nbsp;&nbsp;  \n✅ Get started [here](https://medium.com/warwick-artificial-intelligence/wai203-part-1-fine-tuning-our-model-204f6d0bc5c)		https://medium.com/warwick-artificial-intelligence/wai203-part-1-fine-tuning-our-model-204f6d0bc5c	        t
\.


--
-- Data for Name: tutorial_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tutorial_users_user ("tutorialId", "userId") FROM stdin;
1	1
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "createdAt", "updatedAt", "firstName", "lastName", email, "cognitoUsername", "tokenVersion", role) FROM stdin;
1	2022-01-04 00:23:56.818942	2022-01-04 00:23:56.818942	Edward	Upton	Edward.Upton@warwick.ac.uk	warwick.ac.uk_edward.upton@warwick.ac.uk	0	exec
13	2022-01-10 03:51:08.615501	2022-01-10 03:51:08.615501	Rianur	Rahman	Rianur.Rahman@warwick.ac.uk	warwick.ac.uk_rianur.rahman@warwick.ac.uk	0	none
15	2022-01-10 07:14:23.488441	2022-01-10 07:14:23.488441	Osi	Obomighie	Osi.Obomighie@warwick.ac.uk	warwick.ac.uk_osi.obomighie@warwick.ac.uk	0	none
2	2022-01-04 09:24:26.017847	2022-01-04 11:19:49.183792	Zain	Mothupi	Zain.Mothupi@warwick.ac.uk	warwick.ac.uk_zain.mothupi@warwick.ac.uk	0	exec
16	2022-01-10 11:30:14.552275	2022-01-10 11:30:14.552275	George	Che	George.Che@warwick.ac.uk	warwick.ac.uk_george.che@warwick.ac.uk	0	none
17	2022-01-10 12:22:04.224211	2022-01-10 12:22:04.224211	Samuel	Herodotou	Samuel.Herodotou@warwick.ac.uk	warwick.ac.uk_samuel.herodotou@warwick.ac.uk	0	none
18	2022-01-10 12:48:09.637544	2022-01-10 12:48:09.637544	Neil	Shaabi	Neil.Shaabi@warwick.ac.uk	warwick.ac.uk_neil.shaabi@warwick.ac.uk	0	none
3	2022-01-04 11:47:46.589502	2022-01-04 12:02:05.035681	Navya	Prakash	Navya.Prakash@warwick.ac.uk	warwick.ac.uk_navya.prakash@warwick.ac.uk	0	exec
19	2022-01-10 12:48:35.910091	2022-01-10 12:48:35.910091	Ollie	Lawrence	Ollie.Lawrence@warwick.ac.uk	warwick.ac.uk_ollie.lawrence@warwick.ac.uk	0	none
20	2022-01-10 16:33:14.845971	2022-01-10 16:33:14.845971	Marc	Zhan	Marc.Zhan@warwick.ac.uk	warwick.ac.uk_marc.zhan@warwick.ac.uk	0	none
21	2022-01-10 18:17:19.986474	2022-01-10 18:17:19.986474	Farhan	Kamil-Okedara	Farhan.Kamil-Okedara@warwick.ac.uk	warwick.ac.uk_farhan.kamil-okedara@warwick.ac.uk	0	none
4	2022-01-04 13:53:12.26747	2022-01-04 13:56:51.974639	Joe	Hewett	Joe.Hewett@warwick.ac.uk	warwick.ac.uk_joe.hewett@warwick.ac.uk	0	exec
22	2022-01-10 19:30:53.149806	2022-01-10 19:30:53.149806	Rosemary	Ellery	Rosemary.Ellery@warwick.ac.uk	warwick.ac.uk_rosemary.ellery@warwick.ac.uk	0	none
23	2022-01-11 10:46:27.542568	2022-01-11 10:46:27.542568	Saahil	Dhand	Saahil.Dhand@warwick.ac.uk	warwick.ac.uk_saahil.dhand@warwick.ac.uk	0	none
24	2022-01-11 12:44:37.122279	2022-01-11 12:44:37.122279	Avazbek	Isroilov	Avazbek.Isroilov@warwick.ac.uk	warwick.ac.uk_avazbek.isroilov@warwick.ac.uk	0	none
5	2022-01-04 18:09:55.557632	2022-01-04 18:12:27.067376	Ollie	Jaffe	Oliver.Jaffe@warwick.ac.uk	warwick.ac.uk_oliver.jaffe@warwick.ac.uk	0	exec
37	2022-01-20 21:13:28.644115	2022-01-20 21:13:28.644115	Christian	Spooner	Christian.Spooner@warwick.ac.uk	warwick.ac.uk_christian.spooner@warwick.ac.uk	0	none
38	2022-01-20 22:47:55.595946	2022-01-20 22:47:55.595946	Jakub	Czarlinski	Jakub.Czarlinski@warwick.ac.uk	warwick.ac.uk_jakub.czarlinski@warwick.ac.uk	0	none
39	2022-01-21 23:09:05.548676	2022-01-21 23:09:05.548676	Thinogen	Balendran	Thinogen.Balendran@warwick.ac.uk	warwick.ac.uk_thinogen.balendran@warwick.ac.uk	0	none
25	2022-01-11 19:28:10.055719	2022-01-11 20:37:57.285373	Aadithya	Mohana Krishnan	Aadithya.Mohana-Krishnan@warwick.ac.uk	warwick.ac.uk_aadithya.mohana-krishnan@warwick.ac.uk	0	exec
26	2022-01-12 16:18:50.793601	2022-01-12 16:18:50.793601	Samik	Gupta	Samik.Gupta@warwick.ac.uk	warwick.ac.uk_samik.gupta@warwick.ac.uk	0	none
27	2022-01-12 23:47:09.524052	2022-01-12 23:47:09.524052	Kush	Patel	Kush.Patel@warwick.ac.uk	warwick.ac.uk_kush.patel@warwick.ac.uk	0	none
6	2022-01-04 18:39:49.524962	2022-01-04 18:52:59.494514	Tomás	Freitas Fernandes	Tomas.Freitas-Fernandes@warwick.ac.uk	warwick.ac.uk_tomas.freitas-fernandes@warwick.ac.uk	0	exec
28	2022-01-13 19:09:00.359819	2022-01-13 19:09:00.359819	Sammy	Young	Samuel.Young@warwick.ac.uk	warwick.ac.uk_samuel.young@warwick.ac.uk	0	none
29	2022-01-13 19:11:09.427506	2022-01-13 19:11:09.427506	Michael	Cooper	Michael.Cooper@warwick.ac.uk	warwick.ac.uk_michael.cooper@warwick.ac.uk	0	none
30	2022-01-14 18:14:56.535053	2022-01-14 18:14:56.535053	Selin	Gurhan	Selin.Gurhan@warwick.ac.uk	warwick.ac.uk_selin.gurhan@warwick.ac.uk	0	none
7	2022-01-04 19:05:09.299904	2022-01-04 19:07:10.869433	Preksha	Hooda	Preksha.Hooda@warwick.ac.uk	warwick.ac.uk_preksha.hooda@warwick.ac.uk	0	exec
31	2022-01-14 19:48:58.657306	2022-01-14 19:48:58.657306	Oliver	Andreae	Oliver.Andreae@warwick.ac.uk	warwick.ac.uk_oliver.andreae@warwick.ac.uk	0	none
32	2022-01-17 00:22:23.259209	2022-01-17 00:22:23.259209	Chen	Ong	Chen.Ong@warwick.ac.uk	warwick.ac.uk_chen.ong@warwick.ac.uk	0	none
33	2022-01-17 09:03:07.919206	2022-01-17 09:03:07.919206	Aidan	Hall	Aidan.Hall@warwick.ac.uk	warwick.ac.uk_aidan.hall@warwick.ac.uk	0	none
8	2022-01-06 18:27:36.173761	2022-01-06 18:27:40.559929	Vishal	Dhayalan	Vishal.Dhayalan@warwick.ac.uk	warwick.ac.uk_vishal.dhayalan@warwick.ac.uk	0	exec
34	2022-01-17 11:16:45.575688	2022-01-17 11:16:45.575688	Preya	Thaker	Preya.Thaker@warwick.ac.uk	warwick.ac.uk_preya.thaker@warwick.ac.uk	0	none
35	2022-01-19 17:58:43.308007	2022-01-19 17:58:43.308007	Emilio	Torres Lozano	Emilio.Torres-Lozano@warwick.ac.uk	warwick.ac.uk_emilio.torres-lozano@warwick.ac.uk	0	none
9	2022-01-08 18:20:24.803967	2022-01-08 18:31:53.781691	Paul	Lezeau	Paul.Lezeau@warwick.ac.uk	warwick.ac.uk_paul.lezeau@warwick.ac.uk	0	exec
10	2022-01-09 04:53:41.650813	2022-01-09 04:53:41.650813	Omar	Tanner	Omar.Nashi@warwick.ac.uk	warwick.ac.uk_omar.nashi@warwick.ac.uk	0	none
11	2022-01-09 23:22:36.174468	2022-01-09 23:22:36.174468	Alistair	Ryan	Alistair.Ryan@warwick.ac.uk	warwick.ac.uk_alistair.ryan@warwick.ac.uk	0	none
12	2022-01-10 00:06:31.407496	2022-01-10 00:06:31.407496	Manas	Mathapati	Manas.Mathapati@warwick.ac.uk	warwick.ac.uk_manas.mathapati@warwick.ac.uk	0	none
40	2022-01-22 12:35:46.81515	2022-01-22 12:35:46.81515	Tanya	Costa Lopes	Tanya.Costa-Lopes@warwick.ac.uk	warwick.ac.uk_tanya.costa-lopes@warwick.ac.uk	0	none
41	2022-01-22 12:54:37.655673	2022-01-22 12:54:37.655673	Kiran	Sanganee	Kiran.Sanganee@warwick.ac.uk	warwick.ac.uk_kiran.sanganee@warwick.ac.uk	0	none
42	2022-01-22 15:46:17.524312	2022-01-22 15:46:17.524312	David	Burkett	David.Burkett@warwick.ac.uk	warwick.ac.uk_david.burkett@warwick.ac.uk	0	none
36	2022-01-20 13:19:35.009408	2022-01-20 15:49:51.362947	Sriya	Roy	Sriya.Roy@warwick.ac.uk	warwick.ac.uk_sriya.roy@warwick.ac.uk	0	exec
43	2022-01-23 12:23:11.339156	2022-01-23 12:23:11.339156	Mary	Kassayová	Mary.Kassayova@warwick.ac.uk	warwick.ac.uk_mary.kassayova@warwick.ac.uk	0	none
44	2022-01-23 12:28:12.098509	2022-01-23 12:28:12.098509	Nathan	Downes	Nathan.G.Downes@warwick.ac.uk	warwick.ac.uk_nathan.g.downes@warwick.ac.uk	0	none
45	2022-01-23 13:23:44.51629	2022-01-23 13:23:44.51629	Jenny	Hutchins	Jenny.Hutchins@warwick.ac.uk	warwick.ac.uk_jenny.hutchins@warwick.ac.uk	0	none
14	2022-01-10 06:31:36.369134	2022-01-20 16:08:26.429977	Derya	Catalyurek	Derya.Catalyurek@warwick.ac.uk	warwick.ac.uk_derya.catalyurek@warwick.ac.uk	0	exec
46	2022-01-23 15:54:24.071371	2022-01-23 15:54:24.071371	Stefan	Micu	Stefan.Micu@warwick.ac.uk	warwick.ac.uk_stefan.micu@warwick.ac.uk	0	none
47	2022-01-23 16:50:15.878143	2022-01-23 16:50:15.878143	Varun	Chodanker	Varun.Chodanker@warwick.ac.uk	warwick.ac.uk_varun.chodanker@warwick.ac.uk	0	none
48	2022-01-24 01:36:59.677399	2022-01-24 01:36:59.677399	Henry	Jia	H.Jia.2@warwick.ac.uk	warwick.ac.uk_h.jia.2@warwick.ac.uk	0	none
49	2022-01-24 19:37:17.393186	2022-01-24 19:37:17.393186	Yulu	Pi	Yulu.Pi@warwick.ac.uk	warwick.ac.uk_yulu.pi@warwick.ac.uk	0	none
50	2022-01-24 23:03:10.784912	2022-01-24 23:03:10.784912	Jago	Gatley	Jago.Gatley@warwick.ac.uk	warwick.ac.uk_jago.gatley@warwick.ac.uk	0	none
51	2022-01-25 00:11:33.849272	2022-01-25 00:11:33.849272	Anoushka	Ross	Anoushka.Ross@warwick.ac.uk	warwick.ac.uk_anoushka.ross@warwick.ac.uk	0	none
52	2022-01-25 12:09:25.332346	2022-01-25 12:09:25.332346	Sebastien	Modley	Sebastien.Modley@warwick.ac.uk	warwick.ac.uk_sebastien.modley@warwick.ac.uk	0	none
53	2022-01-25 12:47:54.690536	2022-01-25 12:47:54.690536	David	Jackman	David.D.Jackman@warwick.ac.uk	warwick.ac.uk_david.d.jackman@warwick.ac.uk	0	none
54	2022-01-25 13:15:14.855524	2022-01-25 13:15:14.855524	Stella	Jaquiss	Stella.Jaquiss@warwick.ac.uk	warwick.ac.uk_stella.jaquiss@warwick.ac.uk	0	none
55	2022-01-25 17:34:35.557537	2022-01-25 17:34:35.557537	Luke	Parsons	Luke.H.A.Parsons@warwick.ac.uk	warwick.ac.uk_luke.h.a.parsons@warwick.ac.uk	0	none
56	2022-01-26 14:52:20.016284	2022-01-26 14:52:20.016284	D'juan	Blake	D-juan.Blake@warwick.ac.uk	warwick.ac.uk_d-juan.blake@warwick.ac.uk	0	none
57	2022-01-26 15:30:16.363906	2022-01-26 15:30:16.363906	Jacob	Evans	Jacob.Evans@warwick.ac.uk	warwick.ac.uk_jacob.evans@warwick.ac.uk	0	none
58	2022-01-26 22:56:06.969531	2022-01-26 22:56:06.969531	Om	Kathrecha	Om.Kathrecha@warwick.ac.uk	warwick.ac.uk_om.kathrecha@warwick.ac.uk	0	none
59	2022-01-26 22:56:12.314049	2022-01-26 22:56:12.314049	Devraj	Roy	Devraj.Roy@warwick.ac.uk	warwick.ac.uk_devraj.roy@warwick.ac.uk	0	none
60	2022-01-27 21:18:24.409999	2022-01-27 21:18:24.409999	Joseph	Parker	Joseph.Parker@warwick.ac.uk	warwick.ac.uk_joseph.parker@warwick.ac.uk	0	none
61	2022-01-27 22:00:08.839713	2022-01-27 22:00:08.839713	Louis	Tarvin	Louis.Tarvin@warwick.ac.uk	warwick.ac.uk_louis.tarvin@warwick.ac.uk	0	none
62	2022-01-28 00:04:33.512155	2022-01-28 00:04:33.512155	Chanon	Olley	Chanon.Olley@warwick.ac.uk	warwick.ac.uk_chanon.olley@warwick.ac.uk	0	none
\.


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_id_seq', 8, true);


--
-- Name: merch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.merch_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 8, true);


--
-- Name: talk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.talk_id_seq', 4, true);


--
-- Name: tutorial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tutorial_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 62, true);

--
-- PostgreSQL database dump complete
--


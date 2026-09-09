<h1 align="center">EmboDi</h1>

<h3 align="center">Step into your imagination. Direct your own world with EmboDi.</h3>

<p align="center">
  <a href="https://github.com/XulongT/EmboDi">
    <img src="https://img.shields.io/badge/Node.js-22%2B-339933?logo=nodedotjs&amp;logoColor=white" alt="Node.js 22+">
  </a>
  <a href="https://github.com/XulongT/EmboDi" title="arXiv link pending; opens the repository">
    <img src="https://img.shields.io/badge/arXiv-EmboDi-green" alt="arXiv">
  </a>
  <a href="https://github.com/XulongT/EmboDi" title="Project Page link pending; opens the repository">
    <img src="https://img.shields.io/badge/Project_Page-EmboDi-blue" alt="Project Page">
  </a>
  <a href="https://github.com/XulongT/EmboDi">
    <img src="https://img.shields.io/badge/GitHub-EmboDi-181717?logo=github" alt="GitHub repository">
  </a>
</p>

> **EmboDi (Embodied Director) is an open-source embodied 3D directing system that combines mixed reality (MR) with GPT-6 Astra, giving you the freedom to intuitively create your own stories in your physical space.**

https://github.com/user-attachments/assets/cd5e361a-cb87-4b28-af56-49258d5caf0b

## Installation

Install **Node.js 22 or newer**, download and extract the source release, and run these commands in the directory containing `package.json` to start the [desktop app](http://localhost:8080/):

```sh
npm ci
npm start
```

Optional: run `npm test` for a local smoke check; it does not require an AI account.

## API Setup

The sample scene, manual editing, brushes and recording work without an AI account. Configure these services for AI-generated changes and voice input:

1. Open **API settings** in the desktop page header.
2. In both **Conversation and preferences** and **3D scene construction**, select **OpenAI-compatible API** and enter:

   | Field | Value |
   | --- | --- |
   | **API Base URL** | Your provider's API root, such as `https://your-provider.example/v1`. Replace this example; do not append `/chat/completions`. |
   | **Model name** | The exact model ID provided by your API service. |
   | **API Key** | Your key for that service. |

3. **For voice input**, configure **Speech transcription** separately. The default is **OpenAI**, using `gpt-4o-mini-transcribe`; enter your own key, or choose **Other compatible API** to configure your provider's API base URL, key and transcription model. This service must support `/audio/transcriptions` and return JSON containing `text`. Use `auto` for language detection, or `en` / `zh` as a language hint. A chat-service key or Codex login does not automatically configure speech. Skip this step if you do not use voice.
4. Click **Save API settings**. The next request uses these settings.

Use an API that supports **Chat Completions with strict JSON Schema**. Creating a room from photos also requires image input support. **Conversation and preferences** handles requests, basic motions and interactions; **3D scene construction** handles geometry and photo-based room building. These sections can use different services and models; model selection is shared by the Agents within each section.

Check [the configured Agent models](http://localhost:8080/api/agents), then try a small request from the examples below. If it fails, check the API root, exact model ID, key and the required JSON Schema or image-input support.

If you already have a signed-in Codex CLI on the server computer, you can select **Local Codex** instead of configuring a chat API.

## Connect Meta Quest

Enable developer mode and install Android Platform Tools (`adb`). For the first connection, attach the headset by USB and accept the debugging prompt. With EmboDi running on your computer, choose either connection:

**USB** — Run this in another terminal in the project directory:

```sh
npm run quest
```

**Wi-Fi** — Put the computer and headset on the same Wi-Fi network. While USB is connected, run the following commands, replacing `QUEST_IP` with the headset's IP address from its Wi-Fi settings:

```sh
adb -d tcpip 5555
adb connect QUEST_IP:5555
npm run quest -- QUEST_IP:5555
```

Once connected over Wi-Fi, you can unplug USB. The script opens Quest Browser; choose **Open in Quest** on the page and follow the access prompts to enter the scene. The computer must stay on with EmboDi running. If multiple ADB devices are listed, pass the intended device serial as `npm run quest -- DEVICE_SERIAL`.

## Usage

Start with the included sample room. Press **Y** to show or hide the menu in front of you; use the **right stick** to choose an option and **A** to confirm. Click the **right stick** (**V** on desktop) to switch between edit and explore modes. Start each example in **edit mode**, where objects can be selected and changed. Starting a rehearsal switches to explore mode automatically; return to edit mode before continuing to the next example.

For voice instructions, hold **X**, release to review the transcript, then press **A / Enter** to send, **X** to speak again, or **B / Esc** to cancel. Review the generated proposal separately before applying it. Fixed interface text and object labels are English; voice input supports Chinese and English, and Agent replies follow your language.

<details>
<summary>Start from your own room and adjust its appearance</summary>

1. Choose **Capture a new room** from the start or overview menu. On desktop, open **Capture guide and uploads → Upload room photos** and select at least **4** overlapping photos of the same room. JPEG and PNG are supported, up to **20 MB per original file**, with **no fixed photo-count limit**. Larger sets are processed in batches and take longer.
2. Choose **Build room**, review the miniature blockout, then apply it and follow the entry prompts.
3. For a reconstructed room in Quest MR, open **Y → Room / Alignment → Align room**, adjust the preview if needed and confirm. **Rotate 90°** is available when adjusting orientation; a saved alignment can be revisited from the same menu.
4. Choose **Room / Alignment → Scene transparency** for **30%**, **50%** or **70%** transparency. **70% is the most transparent**. This viewing preference is saved in the current browser and does not fade the camera monitor or exported video.

</details>

### 1. Create and Move an Object

1. Choose **Create → Object**, point at a floor location, and press **A / Enter** to place it.
2. Select the object and choose **Transform**. Move it with the **left stick**, rotate it with the **right stick**, or hold **left grip + left stick up/down** to change its height. Desktop equivalents are in the controls table below.
3. Press **A / Enter** to save or **B / Esc** to cancel. To change its appearance, select it and try a voice instruction such as “Make this object blue.” Review the proposal and apply it.

You can also create by voice: finish the current tool, open **Y → Create → Other**, and say **“Create a door two metres in front of me.”** **Other** clears the current selection and starts listening automatically. Review and send the transcript, then review the generated object and confirm. Manual **Create → Object** placement uses the floor point you choose.

### 2. Add a Custom Motion to an Actor

1. Choose **Create → Actor**, point at the floor, and confirm placement of the included mannequin.
2. With the actor selected, give a voice instruction such as “Have this actor wave its right hand for three seconds.” You can describe a simple pose or short motion.
3. Review the result and choose **Apply changes**. Select the actor and press **left grip** (**Space** on desktop) to rehearse; press again to pause or resume.

### 3. Draw with 2D and 3D Brushes

1. Select an object and choose **Interaction → Draw a path or region**. Choose **Draw ground path · 2D** for a line on the floor, or **Draw spatial path · 3D** for a curve in the air.
2. Hold the **right trigger** (**left mouse button** on desktop) to draw, then release. **Brush settings** lets you adjust smoothing and, for 3D curves, the distance to the brush tip.
3. Press **A / Enter** to save the curve. Try a voice instruction such as “Move this object along this curve in five seconds.”
4. Review and apply the result, then press **left grip / Space** to rehearse the selected object.

Rehearsal starts from the selected object and includes only its explicitly linked participants. Return to edit mode to select a different target or start a fresh rehearsal.

<details>
<summary>Try a surface flow effect with a floor-region trigger</summary>

1. Select one editable primitive object, such as a box, sphere, cylinder or cone. Under **Interaction → Draw a path or region**, choose **Draw surface sources and trigger region**.
2. Hold the **right trigger / left mouse button** to draw a small closed outline on its visible surface, returning near the starting point before releasing. The source appears pink. Draw a separate closed outline on the floor in front of it; this teal region is the trigger. Press **A / Enter** to finish both regions.
3. Say **“When I stay inside this floor region for five seconds, let red fluid flow from the source region on this object for eight seconds.”** Review the transcript, send it, then review and apply the effect.
4. Select the same object and press **left grip / Space** to start a fresh rehearsal. Walk into the floor region on Quest, or move your viewpoint with **WASD** on desktop, and remain there for five seconds. Leaving early resets the timer; each rehearsal fires once.

A door is not required. You can request changes to the flow's colour, amount, speed or extent.

</details>

### 4. Frame and Record

1. Choose **Create → Camera**. Use **Transform** to position and rotate it, then confirm to save.
2. With the camera selected, choose **Interaction → View this camera**, or say **“Preview this camera.”** To compare saved cameras, open the menu and choose **Next camera**. With the menu hidden, **A / Enter** brings the monitor back in front of you; **B / Esc** closes it. Close the monitor before adjusting the camera, save the new pose, then preview again.
3. Optionally choose **Create → Light → Point / Spot** to light the shot. Select the light and request a brightness or colour change, then review and save.
4. Preview the camera you want to record, close the monitor, then choose **Finish setup and explore** from the main edit menu. Open **Recording and export → Start recording**. The camera chosen in the monitor remains the recording camera after closing it and entering explore mode. If you record before opening any camera monitor, recording uses your viewpoint.
5. Choose **Stop and save**, then download the video from **Recording and export** in the desktop **Scene tools**.

Video export requires `ffmpeg` and `ffprobe` on PATH. Each take can be up to three minutes and exports virtual content as MP4, excluding the real camera view, interface and audio.

## Controls

| Action | Quest | Desktop |
| --- | --- | --- |
| Show / hide menu | Y | Y |
| Choose a menu option | Right stick, then A | Click the option |
| Confirm / cancel | A / B | Enter / Esc |
| Voice | Hold X, then review transcript | Hold X, then review transcript |
| Select | Right trigger in edit mode | Click in edit mode |
| Edit mode | Right stick click | V |
| Move viewpoint in explore mode | Walk physically; left stick when room alignment is inactive | WASD |
| Move in Transform | Left stick on the ground plane | WASD |
| Height in Transform | Hold left grip + left stick up/down | Hold Shift + W/S |
| Rotate in Transform | Right stick | Arrow keys |
| Grab in Transform | Hold right grip; release to stop | Use movement controls |
| Draw with a brush | Hold right trigger | Hold left mouse button |
| Rehearse / pause / resume selection | Left grip | Space |

## User Data & Permissions

EmboDi runs a local server on your computer. The browser requests **XR/spatial-tracking** permission for immersive use, **microphone** access for voice input, and **camera** access when you capture room photos.

- **Local storage:** scenes, saved media, request history and API settings are stored in `data/` by default. Some preferences and room-alignment settings are also stored in your browser.
- **AI services:** relevant prompts, scene information, sketches and reference photos are sent to your configured model service when needed. Voice clips are sent to your speech provider for transcription **before** you review the transcript. Optional cloud spoken replies send reply text to the selected speech service; browser speech follows your browser and operating-system settings. Selecting **Local Codex** uses a local CLI to contact its model service; it is not offline inference.
- **Your choices:** use content you have permission to share, and review your providers' privacy, data-retention and billing terms.

## Keep Your API Key Secure

Enter keys through **API settings**. EmboDi stores them on the server computer in `data/providers.json` and makes provider requests from the server. Saved keys are omitted from settings responses, but the file itself is **not encrypted**.

### Critical Security Rules

- Keep keys and local data out of Git, shared archives, screenshots and public logs. The release ignores `data/`, but ignore rules do not protect files already committed.
- Keep the server local. If you adapt EmboDi for hosted use, add authentication and protected server-side secret storage; do not embed provider keys in frontend code.
- Treat keys like passwords. If exposed, revoke or rotate them with your provider and check usage and charges. Follow your provider's key-security guidance.

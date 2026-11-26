from pathlib import Path
import streamlit as st

st.set_page_config(
    page_title="飛往 Jenny 的生日驚喜航班 ✨ | 12/24 Happy Birthday",
    page_icon="🎂",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# 隱藏 Streamlit 預設外框與留白，讓 React 驚喜網站全螢幕呈現
st.markdown(
    """
    <style>
        #MainMenu, header, footer, [data-testid="stToolbar"], [data-testid="stDecoration"] {
            display: none !important;
        }
        .stApp, [data-testid="stAppViewContainer"], .main, .block-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            background-color: #FFFDF9 !important;
        }
        iframe.jenny-hbd-frame {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            z-index: 9999;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

static_index = Path(__file__).parent / "static" / "index.html"

if not static_index.exists():
    st.error("找不到 static/index.html，請先執行 `npm run build` 並將 `dist/` 複製到 `static/`。")
else:
    st.markdown(
        '<iframe class="jenny-hbd-frame" src="./app/static/index.html" allow="microphone; autoplay" allowfullscreen></iframe>',
        unsafe_allow_html=True,
    )

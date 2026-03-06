import React, { useState, useEffect } from 'react';
import { ElevenLabsProvider } from "@elevenlabs/react-native";
import { RealtimeVoiceSession } from './RealtimeVoiceSession';
import { Platform } from 'react-native';

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
    // Lazy load RealtimeVoiceSession only on native platforms when needed
    // This prevents audio focus from being taken on app startup
    const [shouldLoadVoice, setShouldLoadVoice] = useState(false);

    useEffect(() => {
        // Delay loading voice session to prevent audio focus conflict
        // Voice session will be loaded when user actually starts a voice chat
        if (Platform.OS !== 'web') {
            const timer = setTimeout(() => {
                setShouldLoadVoice(true);
            }, 1000); // Load after 1 second to avoid startup audio focus
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <ElevenLabsProvider>
            {shouldLoadVoice && <RealtimeVoiceSession />}
            {children}
        </ElevenLabsProvider>
    );
};
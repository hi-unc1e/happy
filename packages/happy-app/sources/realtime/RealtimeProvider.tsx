import React from 'react';
import { ElevenLabsProvider } from "@elevenlabs/react-native";
// Voice session is NOT loaded by default - user must explicitly enable it
// This prevents audio focus from being taken on app startup
import { Platform } from 'react-native';

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
    // RealtimeVoiceSession is intentionally NOT loaded here
    // It will only be loaded when user explicitly starts a voice chat
    return (
        <ElevenLabsProvider>
            {children}
        </ElevenLabsProvider>
    );
};
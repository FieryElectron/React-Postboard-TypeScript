# React-Postboard-TypeScript

This project is converted from (https://github.com/FieryElectron/React-Postboard).

## Notes

To enable **createRoot** with **TypeScript**, **@types/react-dom@^18.0.0** need to be intalled.

    npm i @types/react-dom@^18.0.0

Add **!** when the value is never **null**.

Before

    const root = createRoot(document.getElementById('root'));

After

    const root = createRoot(document.getElementById('root')!);
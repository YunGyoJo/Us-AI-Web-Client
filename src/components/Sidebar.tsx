import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { motion } from "framer-motion";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
    return (
        <motion.div
            className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}
            initial={false}
            animate={{ width: isOpen ? 260 : 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="toggle-button-container">
                <motion.button
                    className="sidebar-toggle-button"
                    whileHover={{ backgroundColor: '#2B2B2B' }}
                    onClick={onToggle}
                >
                    <FiSidebar />
                </motion.button>
            </div>
            <motion.div
                className={`sidebar-content ${isOpen ? 'open' : 'collapsed'}`}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: isOpen ? 0.2 : 0
                }}
            >
                <div className="toggle-button-boundary"></div>
                <div className="new-chat-button-container">
                    <motion.button
                        className="new-chat-button"
                        whileHover={{ backgroundColor: '#2B2B2B' }}
                    >
                        <HiOutlinePencilSquare />
                        새 채팅
                    </motion.button>
                </div>
                <ul>
                    <li className="conversation-ii">
                        <motion.button
                            className="conversation-item"
                            whileHover={{ backgroundColor: '#2B2B2B' }}
                        >
                            이전 대화 1
                        </motion.button>
                    </li>
                    <li className="conversation-ii">
                        <motion.button
                            className="conversation-item"
                            whileHover={{ backgroundColor: '#2B2B2B' }}
                        >
                            이전 대화 2
                        </motion.button>
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default Sidebar;